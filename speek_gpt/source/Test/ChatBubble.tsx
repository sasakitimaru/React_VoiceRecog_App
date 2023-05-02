import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CorrectGrammer from './CorrectGrammer';

type ChatBubbleProps = {
    isUser: boolean;
    text: string;
};

const ChatBubble = ({ isUser, text }: ChatBubbleProps) => {
    const [isReviewPushed, setIsReviewPushed] = useState<boolean>(false);
    const [isCorrected, setIsCorrected] = useState<boolean>(false);
    const [correctedText, setCorrectedText] = useState<string>('');
    const addCorrectedText = async () => {
        if (!isCorrected) {
            const correctedTextTmp = await CorrectGrammer(text);
            setCorrectedText(correctedTextTmp);
            setIsCorrected(true);
        }
        setIsReviewPushed(!isReviewPushed)
    }

    return (
        <View
            style={[
                styles.chatBubble,
                isUser ? styles.userChatBubble : styles.aiChatBubble,
            ]}>
            <Text style={styles.chatText}>{text}</Text>
            <TouchableOpacity style={styles.reviewButton} onPress={() => addCorrectedText()} >
            <Text style={styles.reviewText}>review</Text>
            </TouchableOpacity>
            {isReviewPushed ? <Text>{`corrected:\n${correctedText}`}</Text> : null}
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
    reviewButton: {
        alignItems: "flex-end",
        padding: '1%',
    },
    reviewText: {
        fontSize: 16,
        color: '#2196f3',
    }
});

export default ChatBubble;