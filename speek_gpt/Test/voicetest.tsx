import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import whisper from '../source/voiceRecog/Whisper';
import { startRecording, stopRecording } from '../source/voiceRecog/audioRecorder';

const Test = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
        });
    }, []);
    const [isRecording, setIsRecording] = useState(false);

    const handleRecordPress = async () => {
        if (isRecording) {
            const audioFile = await stopRecording();
            setIsRecording(false);
            console.log('Recording stopped, file:', audioFile);
            const transcription = await whisper(audioFile);
            console.log('Transcription:', transcription);
        } else {
            startRecording();
            setIsRecording(true);
            console.log('Recording started');
        }
    };

    return (
        <View>
            <Text>Field for debug</Text>
        </View>
    );
};

export default Test;
