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
import { Iconify } from 'react-native-iconify';

type Message = {
  messageID: string | number[];
  isUser: boolean;
  message: string;
}

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
    //　LastSectionIDのstateの更新後に実行するためにuseEffectで実行
    if(headerRigtToggle) sendMessage(LastSectionID+1, topic.route.params.topic, messages);
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
        <Iconify icon="material-symbols:arrow-back-ios-new" size={30} color="#000000" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // sendMessage(LastSectionID+1, topic, messages); ここでは送信されない
            navigation.goBack();
            setHeaderRightToggle(!headerRigtToggle)
          }}
          style={{ marginRight: 10 }}
        >
        <Iconify icon="ic:outline-save-alt" size={30} color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ChatList messages={messages}/>
      {/* <TextInputArea setMessages={setMessages} /> */}
      <VoiceRecog messages={messages} setMessages={setMessages} topic={topic} isElevenlabsEffective={false}/>
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
