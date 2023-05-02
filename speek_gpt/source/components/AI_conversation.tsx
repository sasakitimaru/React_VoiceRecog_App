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
import sendMessage from './History/index';
import fetchLastSectionID from './History/GetLastSectionID';
import { Auth } from 'aws-amplify';

type Message = {
  messageID: string | number[];
  isUser: boolean;
  message: string;
}
type topic = string;

const AI_conversation:React.FC = (topic) => {
  // const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const navigation = useNavigation();
  const [LastSectionID, setLastSectionID] = useState<number | null>(0);
  const [headerRigtToggle, setHeaderRightToggle] = useState<boolean>(false);

  useEffect(() => {
      const getlastsectionID = async () => {
          const currentUser = await Auth.currentAuthenticatedUser();
          if(!currentUser){
              console.error("User not found:", currentUser.id);
          }
          const sectionID_temp = await fetchLastSectionID(currentUser.attributes.sub);
          if(!sectionID_temp){
              console.error("LastSectionID not found:", sectionID_temp);
              setLastSectionID(0);
              return
          }
          setLastSectionID(sectionID_temp)
      }
      getlastsectionID();
  }, []);
  useEffect(() => {
    if(headerRigtToggle) sendMessage(LastSectionID+1, messages);
  }, [headerRigtToggle]);
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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setHeaderRightToggle(!headerRigtToggle)
          }}
          style={{ marginRight: 10 }}
        >
        <Text>quit&write</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ChatList messages={messages}/>
      {/* <TextInputArea setMessages={setMessages} /> */}
      <VoiceRecog messages={messages} setMessages={setMessages} topic={topic}/>
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
