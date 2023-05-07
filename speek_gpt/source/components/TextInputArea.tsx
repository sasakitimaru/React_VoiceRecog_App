import React, { useState } from 'react';
import {
    View, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';

import GenerateResponse from './GenerateResponse';

const TextInputArea = () => {
    const [textInput, setTextInput] = useState('');
      
    const handleSendMessage = async() => {
        const currentTextInput = textInput;
        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { text: currentTextInput, isUser: true },
        // ]);
        
        setTextInput('');
        setTimeout(() => {
            Keyboard.dismiss();
        }, 1);

        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { text: aiResponse, isUser: false },
        // ]);
    };
    
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 20}>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                value={textInput}
                onChangeText={setTextInput}
                placeholder="メッセージを入力"
            />
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>送信</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingLeft: 10,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#2196f3',
        borderRadius: 20,
        padding: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TextInputArea;