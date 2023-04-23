import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import Voice from '@react-native-voice/voice';
import GenerateResponse from './GenerateResponse';
import { useNavigation } from '@react-navigation/native';

type TextInputAreaProps = {
  setMessages: React.Dispatch<React.SetStateAction<Array<{ text: string; isUser: boolean }>>>;
};

const VoiceRecog = ({ setMessages }: TextInputAreaProps) => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: true });
  const [voiceRecogToggle, setVoiceRecogToggle] = useState<boolean>(false);
  const [sendMessageToggle, setSendMessageToggle] = useState<boolean>(false);
  const [recognigedText, setRecognigedText] = useState<string>('');
  useEffect(() => {
    Voice.onSpeechResults = async (e) => {
      setRecognigedText(e.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  useEffect(() => {
    const handleSendMessage = async () => {
      if (sendMessageToggle) {
        setMessages((prevMessages) => [...prevMessages, { text: recognigedText, isUser: true }]);
        setRecognigedText('');
        const aiResponse = await GenerateResponse(recognigedText);
        setMessages((prevMessages) => [...prevMessages, { text: aiResponse, isUser: false }]);
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
