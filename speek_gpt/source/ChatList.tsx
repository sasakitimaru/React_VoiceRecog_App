import React,{ useRef,useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import Tts from 'react-native-tts';

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
        Tts.setDefaultLanguage('en-US');
        console.log('messages: ', messages);
        if (messages.length >0 && !messages[messages.length - 1].isUser){
            Tts.speak(messages[messages.length - 1].text);
        }
        return () => {
            Tts.stop();
            Tts.speak('');
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
