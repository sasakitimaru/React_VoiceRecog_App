import React, { useState, useEffect, } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatList from './components/ChatList/ChatBubbleList';
import VoiceRecog from './components/VoiceRecog/VoiceRecog';
import sendMessage from './components/VoiceRecog/components/SaveConversation';
import fetchLastSectionID from './components/VoiceRecog/components/GetLastSectionID';
import { Auth } from 'aws-amplify';
import { Iconify } from 'react-native-iconify';

export type Message = {
  messageID: string | number[];
  isUser: boolean;
  message: string;
}

const AI_conversation: React.FC = (topic: any) => {
  const isElevenlabsEffective = topic.route.params.isElevenlabsEffective;
  // console.log("AI_conversation.tsx: isElevenlabsEffective:", topic.route.params.isElevenlabsEffective);
  // const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFirstSentenceLoading, setIsFirstSentenceLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const [LastSectionID, setLastSectionID] = useState<number | null>(0);
  const [headerRigtToggle, setHeaderRightToggle] = useState<boolean>(false);

  const createSaveAlert = () =>
    Alert.alert(
      "会話を保存しますか？",
      "保存すると会話を終了します。",
      [
        {
          text: "キャンセル",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "保存する", onPress: () => {
            navigation.goBack();
            setHeaderRightToggle(!headerRigtToggle)
          }
        }
      ],
      { cancelable: false }
    );

  useEffect(() => {
    if (messages && messages.length > 0) {
      setIsFirstSentenceLoading(false);
    }
    console.log("AI_conversation.tsx: useEffect: cleanup:", messages)
  }, [messages]);
  useEffect(() => {
    const getlastsectionID = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (!currentUser) {
        console.error("User not found:", currentUser.id);
      }
      const sectionID_temp = await fetchLastSectionID(currentUser.attributes.sub);
      if (!sectionID_temp) {
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
    if (headerRigtToggle) sendMessage(LastSectionID + 1, topic.route.params.topic, messages);
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
            createSaveAlert();
          }}
          style={{ marginRight: 10 }}
        >
          <Iconify icon="ic:outline-save-alt" size={30} color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, []);
  useEffect(() => {
    // クリーンアップのため
    return () => {
      setMessages([]);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isFirstSentenceLoading &&
        <ActivityIndicator size="large" style={styles.intdicator} />
      }
      <ChatList messages={messages} isElevenlabsEffective={isElevenlabsEffective} />
      <VoiceRecog messages={messages} setMessages={setMessages} topic={topic} isElevenlabsEffective={isElevenlabsEffective} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  intdicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});

export default AI_conversation;
