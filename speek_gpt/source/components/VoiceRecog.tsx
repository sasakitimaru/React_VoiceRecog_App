import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, ActivityIndicator, Switch } from 'react-native';
import GenerateResponse from './GenerateResponse';
import whisper from './voiceRecog/Whisper';
import { startRecording, stopRecording } from './voiceRecog/audioRecorder';
import UUID from 'react-native-uuid';
import Tts from 'react-native-tts'; //Use this when Elevenlabs is uneffective
import TrackPlayer from 'react-native-track-player';
import Elevenlabs from './Conversation/ElevenLabAPI';
import { Iconify } from 'react-native-iconify';
import { CountTokens, CountElevenTokens} from './Conversation/CountTokens';
import fetchUser from './History/FetchUser';
import { useDispatch, useSelector } from 'react-redux';


type Message = {
  messageID: string | number[];
  isUser: boolean;
  message: string;
};

interface MessageForAI {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

type SetMessages = (updater: (prevMessages: Message[]) => Message[]) => void;

type VoiceRecogProps = {
  topic: any;
  messages: Message[];
  setMessages: SetMessages;
  isElevenlabsEffective: boolean;
};

const VoiceRecog: React.FC<VoiceRecogProps> = ({ messages, setMessages, topic, isElevenlabsEffective }) => {
  const [voiceRecogToggle, setVoiceRecogToggle] = useState<boolean>(false);
  const [sendMessageToggle, setSendMessageToggle] = useState<boolean>(false);
  const [firstRenderingToggle, setFirstRenderingToggle] = useState<boolean>(true);
  // const [isElevenlabsEffective, setIsElevenlabsEffective] = useState<boolean>(false);
  const [isLoadingToggle, setIsLoadingToggle] = useState<boolean>(false);
  const [recognigedText, setRecognigedText] = useState<string | void>('');
  const [messageForAI, setMessageForAI] = useState<MessageForAI[]>([]);
  const [FirstPrompt, setFirstPrompt] = useState<MessageForAI[]>([]);
  const [userid, setUserid] = useState<string>('');
  const dispatch = useDispatch();
  const selecter = useSelector((state: any) => state);
  //ユーザーIDの取得とクリーンアップ処理
  useEffect(() => {
    fetchUser().then((user) => {
      setUserid(user.id);
    });

    return () => {
      const cleanup = async () => {
        TrackPlayer.pause();
        TrackPlayer.reset();
        stopRecording();
      }
      cleanup();
      if (!isElevenlabsEffective) {
        Tts.stop();
        Tts.removeAllListeners('tts-start');
      }
    }
  }, []);

  //使用したトークン数のカウント
  useEffect(() => {
    if (messages.length > 0) {
      if (messages[messages.length - 1].isUser === true) {
        const cntcharactorfunc = async () => {
          const cntCharactor = messages[messages.length - 1].message.length;
          if (cntCharactor > 0 && userid !== '') {
            console.log('selected: ', selecter);
            isElevenlabsEffective ? await dispatch(CountElevenTokens(userid, cntCharactor)) : await dispatch(CountTokens(userid, cntCharactor));
          }
        }
        cntcharactorfunc();
      }
    }
  }, [messages]);

  //イベントリスナーの設定と音声の再生、クリーンアップ処理
  useEffect(() => {
    if (isElevenlabsEffective) {
      TrackPlayer.addEventListener('remote-seek', (event) => {
        // TrackPlayer.seekTo(1);
      });
    } else {
      Tts.addEventListener('tts-start', (event) => {
      });
      Tts.setDefaultLanguage('en-US');
    }
    const startTranscribeMessage = async () => {
      if (messages.length > 0 && !messages[messages.length - 1].isUser) {
        if (isElevenlabsEffective) await Elevenlabs(messages[messages.length - 1].message);
        else Tts.speak(messages[messages.length - 1].message);
      }
    }
    startTranscribeMessage();
    return () => {
      if (isElevenlabsEffective) {
        const cleanup = async () => {
          TrackPlayer.pause;
          TrackPlayer.reset;
        }
        cleanup();
      } else {
        Tts.stop();
        Tts.removeAllListeners('tts-start');
      }
    }
  }, [messages]);

  //初回レンダリング時にAIの最初の発話を設定
  useEffect(() => {
    const testfunc = async () => {
      setTimeout(() => {
      }, 1000);
      let firstprompt_tmp = `You are assistant for English learner. You are given this topic: ${topic.route.params.topic}. Please follow this topic to converse with learner. Try to make the conversation as natural as possible, asking just the right amount of questions to make learner feel comfortable. Keep in mind that the main speaker is learner, not you. You are not allowed to talk in any other language other than English.`
      console.log('topic: ', topic.route.params.topic)
      let firststate_tmp = 'The conversation begins with your next statement. You can ask leaner how do they feel about the topic.'
      setMessageForAI([
        { role: 'system', content: firstprompt_tmp },
        { role: 'user', content: firststate_tmp }
      ])
      setFirstPrompt([
        { role: 'system', content: firstprompt_tmp },
        { role: 'user', content: firststate_tmp }
      ])
    }
    testfunc();
  }, []);

  //最初にAIから会話を始めるための例外処理
  useEffect(() => {
    if (FirstPrompt.length > 0) {
      const ToGetGenerateResponce = async () => {
        const aiResponse = await GenerateResponse(messageForAI);
        setMessages((prevMessages) => [...prevMessages, { messageID: UUID.v4(), isUser: false, message: aiResponse }]);
        setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'assistant', content: aiResponse }]);
      };
      ToGetGenerateResponce();
    }
  }, [FirstPrompt]);

  //AIからの発話を取得
  useEffect(() => {
    if (sendMessageToggle) {
      const ToGetGenerateResponce_ = async () => {
        const aiResponse = await GenerateResponse(messageForAI);
        setMessages((prevMessages) => [...prevMessages, { messageID: UUID.v4(), isUser: false, message: aiResponse }]);
        setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'assistant', content: aiResponse }]);
      };
      ToGetGenerateResponce_();
      setSendMessageToggle(!sendMessageToggle);
    }
  }, [firstRenderingToggle]);

  //ユーザーの発話をAIに送信
  useEffect(() => {
    const handleSendMessage = async () => {
      if (sendMessageToggle && recognigedText !== '') {
        setMessages((prevMessages) => [...prevMessages, { messageID: UUID.v4(), message: recognigedText, isUser: true }]);
        setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'user', content: recognigedText }]);
        setFirstRenderingToggle(!firstRenderingToggle)
        setRecognigedText('');
      }
    };
    handleSendMessage();
  }, [voiceRecogToggle]);

  const handleVoiceRecognition = async () => {
    if (voiceRecogToggle) {
      setIsLoadingToggle(true);
      const audioFile = await stopRecording();
      const transcription: string | void = await whisper(audioFile);
      // console.log('transcription', transcription)
      setRecognigedText(transcription);
      setIsLoadingToggle(false); // !isLoadingToggleだと前のステートが反映されないまま反転処理をしようとしてうまくいかない
      setSendMessageToggle(!sendMessageToggle);
    } else {
      if (isElevenlabsEffective) {
        await TrackPlayer.pause();
        await TrackPlayer.reset();
      } else {
        Tts.stop();
      }
      setTimeout(() => {
      }, 1000);
      try {
        startRecording();
      } catch (e) {
        console.log('error: ', e)
      }
    }

    setVoiceRecogToggle(!voiceRecogToggle);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleVoiceRecognition} 
        style={styles.voiceButton}
        disabled={isLoadingToggle}
      >
        {/* {voiceRecogToggle ? 
          <Iconify icon="material-symbols:android-recorder" size={24} color="white" /> 
          : 
          null  */}
        {isLoadingToggle ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : voiceRecogToggle ? (
          <Iconify icon="material-symbols:android-recorder" size={30} color="white" />
        ) : (
          <Iconify icon="material-symbols:mic" size={30} color="white" />
        )}
      </TouchableOpacity>
      {/* <Button onPress={() => setIsElevenlabsEffective(!isElevenlabsEffective)} title={isElevenlabsEffective ? 'Use TTS' : 'Use Elevenlabs'} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  voiceButton: {
    backgroundColor: '#2196f3',
    alignItems: 'center',
    borderRadius: 50,
    width: 60,
    padding: 10,
    marginBottom: 10,
  },
  voiceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 10,
    width: '80%',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#2196f3',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VoiceRecog;
