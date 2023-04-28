import React,{ useRef,useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import Tts from 'react-native-tts';
import sendMessage from './History/index';
import fetchLastSectionID from './History/GetLastSectionID';
import { Auth } from 'aws-amplify';

type MessageType = {
    isUser: boolean;
    text: string;
};

type ChatListProps = {
    messages: MessageType[];
};

const ChatList:React.FC<ChatListProps> = ({ messages }) => {
    const flatListRef = useRef(null);
    var LastSectionID:string = '';
    useEffect(() => {
        const getlastsectionID = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            if(!currentUser){
                console.error("User not found:", currentUser.id);
            }
            LastSectionID = await fetchLastSectionID(currentUser.attributes.sub);
            if(!LastSectionID){
                console.error("LastSectionID not found:", LastSectionID);
            }
        }
        getlastsectionID();
    }, []);
    useEffect(() => {
        Tts.addEventListener('tts-start', (event) => {
        });
        Tts.setDefaultLanguage('en-US');
        console.log('lastsection:', LastSectionID)
        if (messages[messages.length - 1]) sendMessage(LastSectionID, messages[messages.length - 1])
        // console.log('messages_debugging: ', messages);
        if (messages.length >0 && !messages[messages.length - 1].isUser){
            Tts.speak(messages[messages.length - 1].text);
        }
        return () => {
            Tts.stop();
            Tts.removeAllListeners('tts-finish');
        }
    }, [messages]);
    return (
        <FlatList
            data={messages}
            renderItem={({ item }) => <ChatBubble isUser={item.isUser} text={item.text} />}
            keyExtractor={(_, index) => index.toString()}
            ref={flatListRef}
            onContentSizeChange={() => messages.length > 0 && flatListRef.current.scrollToEnd({animated: true})}
            onLayout={() => messages.length > 0 && flatListRef.current.scrollToEnd({animated: true})}
            style={styles.chatList}
            contentContainerStyle={styles.chatListContent}
        />
    );
};

const styles = StyleSheet.create({
    chatList: {
        flex: 1,
    },
    chatListContent: {
        padding: 10,
    },
});

export default ChatList;
