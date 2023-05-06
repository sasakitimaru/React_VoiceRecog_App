import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CorrectGrammer from '../components/Conversation/CorrectGrammer';
import TranslateText from './TranslateText.js';

type ChatBubbleProps = {
    isUser: boolean;
    text: string;
};

const ChatBubble = ({ isUser, text }: ChatBubbleProps) => {
    const [isReviewPushed, setIsReviewPushed] = useState<boolean>(false);
    const [isCorrected, setIsCorrected] = useState<boolean>(false);
    const [isTranslated, setIsTranslated] = useState<boolean>(false);
    const [isTranslatedPushed, setIsTranslatedPushed] = useState<boolean>(false);
    const [correctedText, setCorrectedText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const addTranslatedText = async () => {
        if (!isTranslated) {
            const translatedTextTmp = await TranslateText(text);
            setTranslatedText(translatedTextTmp);
            setIsTranslated(true);
        }
        setIsTranslatedPushed(!isTranslatedPushed)
    }
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
            { isUser ? 
                <TouchableOpacity style={styles.reviewButton} onPress={() => addCorrectedText()} >
                <Text style={styles.reviewText}>review</Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity style={styles.translateButton} onPress={() => addTranslatedText()} >
                <Text style={styles.reviewText}>translate</Text>
                </TouchableOpacity>
            }   
            {isReviewPushed ? <Text>{`corrected:\n${correctedText}`}</Text> : null}
            {isTranslatedPushed ? <Text>{`translated:\n${translatedText}`}</Text> : null}
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
    translateButton: {
        alignItems: "flex-start",
        padding: '1%',
    },
    reviewText: {
        fontSize: 16,
        color: '#2196f3',
    }
});

export default ChatBubble;