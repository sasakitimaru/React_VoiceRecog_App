import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, DeviceEventEmitter } from 'react-native';
import Voice from '@react-native-voice/voice';
import GenerateResponse from './GenerateResponse';

type Message = {
  isUser: boolean;
  text: string;
};

interface MessageForAI {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

type SetMessages = (updater:(prevMessages: Message[]) => Message[]) => void;

type VoiceRecogProps = {
  setMessages: SetMessages;
};

const VoiceRecog:React.FC<VoiceRecogProps> = ({ setMessages }) => {
  const [voiceRecogToggle, setVoiceRecogToggle] = useState<boolean>(false);
  const [sendMessageToggle, setSendMessageToggle] = useState<boolean>(false);
  const [recognigedText, setRecognigedText] = useState<string>('');
  const [messageForAI, setMessageForAI] = useState<MessageForAI[]>([]);
  const [FirstPrompt, setFirstPrompt] = useState<MessageForAI[]>([]);

  useEffect(() => {
    const testfunc = async () => {
      let firstprompt_tmp = 'Hello, I am an AI language assistant designed to help people improve their English skills, especially in speaking. While speaking is the main focus, I can also help with other aspects of English learning. I am here to be your conversation partner and provide guidance on grammar, vocabulary, and pronunciation to make your learning experience more efficient and enjoyable.' 
      let firststate_tmp = 'You can start conversation first.'
      setMessageForAI([
        {role: 'system', content: firstprompt_tmp},
        {role: 'user', content: firststate_tmp}
      ])
      setFirstPrompt([
        {role: 'system', content: firstprompt_tmp},
        {role: 'user', content: firststate_tmp}
      ])
      // console.log('messageforai_on_voiceRecog: ', messageForAI)
    }
    testfunc();
    Voice.onSpeechResults = async (e) => {
      setRecognigedText(e.value[0]);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    const ToGetGenerateResponce = async () => {
      const aiResponse = await GenerateResponse(FirstPrompt[1].content, messageForAI, setMessageForAI);
      setMessages((prevMessages) => [...prevMessages, { isUser: false, text: aiResponse }]);
      setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'assistant', content: aiResponse }]);
    };
    ToGetGenerateResponce();
  }, [FirstPrompt]);

  useEffect(() => {
    const handleSendMessage = async () => {
      if (sendMessageToggle) {
        setMessages((prevMessages) => [...prevMessages, { text: recognigedText, isUser: true }]);
        setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'user', content: recognigedText }]);
        const aiResponse = await GenerateResponse(recognigedText, messageForAI, setMessageForAI);
        setMessages((prevMessages) => [...prevMessages, { isUser: false, text: aiResponse }]);
        setMessageForAI((prevMessageForAI) => [...prevMessageForAI, { role: 'assistant', content: aiResponse }]);
        setRecognigedText('');
        setSendMessageToggle(!sendMessageToggle);
      }
    };
    handleSendMessage();
  }, [voiceRecogToggle]);

  const handleVoiceRecognition = async () => {
    if (voiceRecogToggle) {
      Voice.stop();
      setSendMessageToggle(!sendMessageToggle);
    } else {
      Voice.start('en-US');
    }

    setVoiceRecogToggle(!voiceRecogToggle);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleVoiceRecognition} style={styles.voiceButton}>
        <Text style={styles.voiceButtonText}>{voiceRecogToggle ? 'Stop' : 'Start'} Voice Recognition</Text>
      </TouchableOpacity>
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
