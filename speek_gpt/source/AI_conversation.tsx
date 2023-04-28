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

type AI_conversationProps = {
  setTopic: (topic: String) => void;
};
type Message = {
  isUser: boolean;
  text: string;
}

const AI_conversation:React.FC<AI_conversationProps> = ({setTopic}) => {
  // const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [headerLeftToggle, setHeaderLeftToggle] = useState<Boolean>(false);
  useEffect(() => {
    setHeaderLeftToggle(true);
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setTopic('');
            setHeaderLeftToggle(false);
            // navigation.goBack();
          }}
          style={{ marginLeft: 10 }}
        >
        { headerLeftToggle ? <Text>Back</Text> : null }
          {/* <Icon name="arrow-left" size={24} color="#000" /> */}
        </TouchableOpacity>
      ),
    });
  }, [headerLeftToggle]);
  console.log('messages: ',messages)
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
