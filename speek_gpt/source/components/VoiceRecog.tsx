import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import GenerateResponse from './GenerateResponse';
import whisper from './voiceRecog/Whisper';
import { startRecording, stopRecording } from './voiceRecog/audioRecorder';
import UUID from 'react-native-uuid';
import Tts from 'react-native-tts'; //Use this when Elevenlabs is uneffective
import TrackPlayer from 'react-native-track-player';
import Elevenlabs from './Conversation/ElevenLabAPI';


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
};

const VoiceRecog: React.FC<VoiceRecogProps> = ({ messages, setMessages, topic }) => {
  const [voiceRecogToggle, setVoiceRecogToggle] = useState<boolean>(false);
  const [sendMessageToggle, setSendMessageToggle] = useState<boolean>(false);
  const [firstRenderingToggle, setFirstRenderingToggle] = useState<boolean>(true);
  const [isElevenlabsEffective, setIsElevenlabsEffective] = useState<boolean>(false);
  const [recognigedText, setRecognigedText] = useState<string>('');
  const [messageForAI, setMessageForAI] = useState<MessageForAI[]>([]);
  const [FirstPrompt, setFirstPrompt] = useState<MessageForAI[]>([]);

  useEffect(() => {
    return () => {
      const cleanup = async () => {
        TrackPlayer.pause();
        TrackPlayer.reset();
      }
      cleanup();
      if (!isElevenlabsEffective) {
        Tts.stop();
        Tts.removeAllListeners('tts-start');
      }
    }
  }, []);

  useEffect(() => {
    if (isElevenlabsEffective) {
      TrackPlayer.addEventListener('remote-seek', (event) => {
        TrackPlayer.seekTo(1);
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

  useEffect(() => {
    const testfunc = async () => {
      setTimeout(() => {
      }, 1000);
      let firstprompt_tmp = `You are assistant for English learner. You are given this topic: ${topic.route.params.topic}. Please follow this topic to converse with learner. Try to make the conversation as natural as possible, asking just the right amount of questions to make learner feel comfortable talking about the topic.`
      console.log('topic: ', topic.route.params.topic)
      let firststate_tmp = 'The conversation begins with your next statement. You start the conversation natural as if you had spoken to learner.'
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

  useEffect(() => {
    const handleSendMessage = async () => {
      if (sendMessageToggle) {
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
      const audioFile = await stopRecording();
      const transcription: string | void = await whisper(audioFile);
      console.log('transcription', transcription)
      setRecognigedText(transcription);
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
      <TouchableOpacity onPress={handleVoiceRecognition} style={styles.voiceButton}>
        <Text style={styles.voiceButtonText}>{voiceRecogToggle ? 'Stop' : 'Start'} Voice Recognition</Text>
      </TouchableOpacity>
      <Button onPress={() => setIsElevenlabsEffective(!isElevenlabsEffective)} title={isElevenlabsEffective ? 'Use TTS' : 'Use Elevenlabs'} />
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
    borderRadius: 20,
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
