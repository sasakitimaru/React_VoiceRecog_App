import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CorrectGrammer from './components/CorrectGrammer';
import TranslateText from './components/TranslateText';
import { Iconify } from 'react-native-iconify';
import AudioReplay from './components/AudioReplay';

type ChatBubbleProps = {
    isUser: boolean;
    text: string;
    isElevenlabsEffective?: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ isUser, text, isElevenlabsEffective }) => {
    // レビューの表示、非表示を制御するトグル
    const [isReviewPushed, setIsReviewPushed] = useState<boolean>(false);
    // 一度だけレビューの実行を行うためのフラグ
    const [isCorrected, setIsCorrected] = useState<boolean>(false);
    // CorrectGrammerのAPIからのレスポンス待機中を示すフラグ
    const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);
    // 翻訳の表示、非表示を制御するトグル
    const [isTranslatedPushed, setIsTranslatedPushed] = useState<boolean>(false);
    // 一度だけ翻訳の実行を行うためのフラグ
    const [isTranslated, setIsTranslated] = useState<boolean>(false);
    // translatetextのAPIからのレスポンス待機中を示すフラグ
    const [isTranslateLoading, setIsTranslateLoading] = useState<boolean>(false);
    const [correctedText, setCorrectedText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const addTranslatedText = async () => {
        if (!isTranslated) {
            setIsTranslateLoading(true);
            const translatedTextTmp = await TranslateText(text);
            setTranslatedText(translatedTextTmp);
            setIsTranslated(true);
            setIsTranslateLoading(false);
        }
        setIsTranslatedPushed(!isTranslatedPushed)
    }
    const addCorrectedText = async () => {
        if (!isCorrected) {
            setIsReviewLoading(true);
            const correctedTextTmp = await CorrectGrammer(text);
            setCorrectedText(correctedTextTmp);
            setIsCorrected(true);
            setIsReviewLoading(false);
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
            {isUser ?
                (isReviewLoading ?
                    <View style={styles.reviewButton}>
                        <ActivityIndicator size="small" color="gray" />
                    </View>
                    :
                    <TouchableOpacity style={styles.reviewButton} onPress={() => addCorrectedText()} >
                        <Iconify icon="codicon:open-preview" size={20} color="blue" />
                    </TouchableOpacity>)
                :
                <View style={styles.isReplayContainer}>
                    {isTranslateLoading ?
                        <ActivityIndicator size="small" color="gray" />
                        :
                        <TouchableOpacity style={styles.translateButton} onPress={() => addTranslatedText()} >
                            <Iconify icon="material-symbols:translate" size={20} color="blue" />
                        </TouchableOpacity>
                    }
                    <AudioReplay text={text} isElevenlabsEffective={isElevenlabsEffective} />
                </View>
            }
            {isReviewPushed ? <Text>{`修正例:\n${correctedText}`}</Text> : null}
            {isTranslatedPushed ? <Text>{`翻訳例:\n${translatedText}`}</Text> : null}
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
    },
    isReplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ChatBubble;