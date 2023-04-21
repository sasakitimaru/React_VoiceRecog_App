import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import Voice from '@react-native-voice/voice';
import GenerateResponse from './GenerateResponse';

type TextInputAreaProps = {
  setMessages: React.Dispatch<React.SetStateAction<Array<{ text: string; isUser: boolean }>>>;
};

const VoiceRecog:React.FC = ({ setMessages }: TextInputAreaProps) => {
  const [voiceRecogToggle, setVoiceRecogToggle] = useState<boolean>(false);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      setTextInput(e.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleVoiceRecognition = async () => {
    if (voiceRecogToggle) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }

    setVoiceRecogToggle(!voiceRecogToggle);
  };

  const handleSendMessage = async () => {
    setMessages((prevMessages) => [...prevMessages, { text: textInput, isUser: true }]);
    setTextInput('');

    const aiResponse = await GenerateResponse(textInput);
    setMessages((prevMessages) => [...prevMessages, { text: aiResponse, isUser: false }]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleVoiceRecognition} style={styles.voiceButton}>
        <Text style={styles.voiceButtonText}>{voiceRecogToggle ? 'Stop' : 'Start'} Voice Recognition</Text>
      </TouchableOpacity>
      <TextInput style={styles.textInput} value={textInput} onChangeText={setTextInput} placeholder="Voice input" />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
