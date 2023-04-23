import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { ChatList } from './index';
import VoiceRecog from './VoiceRecog';

function AI_conversation() {
  // const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);


  return (
    <SafeAreaView style={styles.container}>
      <ChatList messages={messages} />
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
