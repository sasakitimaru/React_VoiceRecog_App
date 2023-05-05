import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import TrackPlayer from 'react-native-track-player';


const Elevenlabs = (text: string) => {
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB';
    const outputPath = `${RNFS.DocumentDirectoryPath}/tmp.mp3`;
    // const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const headers = {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        "xi-api-key": "1897d63c83d9597e99c7281ab42c120d"
    };

    const data = {
        "text": text,
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0
        }
    }


    const samplerecord = async () => {
        try {
            const response = await axios.post(url, data, {
                headers: headers,
                responseType: 'arraybuffer',
            });
            await RNFS.writeFile(outputPath, Buffer.from(response.data, 'binary').toString('base64'), 'base64');
            console.log('response', outputPath);
            // await TrackPlayer.setupPlayer();
            await TrackPlayer.add({
                id: 'trackId',
                url: outputPath,
                title: 'Track Title',
                artist: 'Track Artist',
                // artwork: require('track.png')
            });
            await TrackPlayer.play();
        } catch (error) {
            console.log(error);
        }
    };
    samplerecord();
    // TrackPlayer.play();
};
export default Elevenlabs;