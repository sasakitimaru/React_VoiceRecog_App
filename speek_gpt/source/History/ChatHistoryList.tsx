import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ChatBubble from '../ChatBubble';

type MessageType = {
    isUser: boolean;
    message: string;
};

type ChatListProps = {
    messages: MessageType[];
};

const ChatHistoryList:React.FC<ChatListProps> = ({ messages }) => {
    // const chatListProps: ChatListProps = messages
    // const chatlistProps: ChatListProps = {messages}
    // console.log('messages_at_history_list: ', chatlistProps)
    return (
        <FlatList
            data={messages}
            renderItem={({ item }) => 
                <ChatBubble isUser={item.isUser} text={item.message} />
            }
            keyExtractor={(_, index) => index.toString()}
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

export default ChatHistoryList;
