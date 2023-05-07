import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import ChatHistoryList from './ChatHistoryList';
import { useNavigation } from '@react-navigation/native';

type Message = {
    isUser: boolean;
    message: string;
}

type ChatHistoryProps = {
    messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = (props) => {
    const navigate = useNavigation();
    //tom.ok1@icloud.com
    useEffect(() => {
        navigate.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigate.goBack()}
                    style={{ marginLeft: 10 }}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, []);
    const messages: ChatHistoryProps = props.route.params;
    // console.log('params : ', messages.props)
    return (
        <SafeAreaView style={styles.container}>
            <ChatHistoryList messages={messages.props} />
            {/* <TextInputArea setMessages={setMessages} /> */}
        </SafeAreaView>
    );
}
export default ChatHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
