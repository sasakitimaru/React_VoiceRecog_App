import React,{ useRef,useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import Tts from 'react-native-tts';
import sendMessage from './History/index';

type MessageType = {
    isUser: boolean;
    text: string;
};

type ChatListProps = {
    messages: MessageType[];
};

const ChatList = ({ messages }: ChatListProps) => {
    const flatListRef = useRef(null);
    useEffect(() => {
        Tts.addEventListener('tts-start', (event) => {
        });
        Tts.setDefaultLanguage('en-US');
        sendMessage('1', messages[messages.length - 1]);
        // console.log('messages_debugging: ', messages[messages.length - 1]);
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
