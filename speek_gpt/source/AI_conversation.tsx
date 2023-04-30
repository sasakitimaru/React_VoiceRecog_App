import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from './index';
import VoiceRecog from './VoiceRecog';

type Message = {
  isUser: boolean;
  text: string;
}

const AI_conversation:React.FC = () => {
  // const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginLeft: 10 }}
        >
        <Text>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  // console.log('messages: ',messages)
  return (
    <SafeAreaView style={styles.container}>
      <ChatList messages={messages}/>
      {/* <TextInputArea setMessages={setMessages} /> */}
      <VoiceRecog setMessages={setMessages} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AI_conversation;
