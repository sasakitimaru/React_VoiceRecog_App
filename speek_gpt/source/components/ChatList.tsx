import React,{ useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';

type MessageType = {
    isUser: boolean;
    message: string;
};

type ChatListProps = {
    messages: MessageType[];
    isElevenlabsEffective: boolean;
};

const ChatList:React.FC<ChatListProps> = ({ messages, isElevenlabsEffective }) => {
    const flatListRef = useRef(null);
    
    return (
        <FlatList
            data={messages}
            renderItem={({ item }) => <ChatBubble isUser={item.isUser} text={item.message} isElevenlabsEffective={isElevenlabsEffective}/>}
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
