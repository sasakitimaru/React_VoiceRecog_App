import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import TrackPlayer from 'react-native-track-player';


const Test = () => {
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB';
    const outputPath = `${RNFS.DocumentDirectoryPath}/tmp.mp3`;
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const headers = {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        "xi-api-key": "1897d63c83d9597e99c7281ab42c120d"
    };

    const data = {
        "text": "Hello! I'm a text-to-speech API. I'm testing that how this API works.",
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0
        }
    }

    // useEffect(() => {
    //     const samplerecord = async () => {
    //         try {
    //             const response = await axios.post(url, data, {
    //                 headers: headers,
    //                 responseType: 'arraybuffer',
    //             });
    //             await RNFS.writeFile(outputPath, Buffer.from(response.data, 'binary').toString('base64'), 'base64');
    //             console.log('response', outputPath);
    //             // await TrackPlayer.setupPlayer();
    //             await TrackPlayer.add({
    //                 id: 'trackId',
    //                 url: outputPath,
    //                 title: 'Track Title',
    //                 artist: 'Track Artist',
    //                 // artwork: require('track.png')
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     samplerecord();
    // }, []);

    const handlePlayPause = () => {
        if(isPlaying) TrackPlayer.pause();
        else TrackPlayer.play();
        setIsPlaying(!isPlaying);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
});

