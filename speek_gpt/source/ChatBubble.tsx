import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChatBubbleProps = {
    isUser: boolean;
    text: string;
};

const ChatBubble = ({ isUser, text }: ChatBubbleProps) => {
    return (
        <View
            style={[
                styles.chatBubble,
                isUser ? styles.userChatBubble : styles.aiChatBubble,
            ]}>
            <Text style={styles.chatText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chatBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userChatBubble: {
        backgroundColor: '#e6e6ff',
        alignSelf: 'flex-end',
    },
    aiChatBubble: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    chatText: {
        fontSize: 16,
    },
});

export default ChatBubble;