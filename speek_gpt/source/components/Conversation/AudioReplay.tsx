import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Iconify } from 'react-native-iconify';
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';
import Tts from 'react-native-tts';
import RNFS from 'react-native-fs';

type AudioReplayProps = {
    text: string;
    isElevenlabsEffective?: boolean;
};
const AudioReplay: React.FC<AudioReplayProps> = ({ text, isElevenlabsEffective }) => {
    console.log('AudioReplay.tsx: isElevenlabsEffective: ', isElevenlabsEffective)
    const outputPath = `${RNFS.DocumentDirectoryPath}/tmp.mp3`
    const [isReplayPushed, setIsReplayPushed] = useState<boolean>(false);

    useTrackPlayerEvents([Event.PlaybackQueueEnded], () => {
        setIsReplayPushed(false);
    });
    Tts.addEventListener('tts-finish', () => {
        setIsReplayPushed(false);
    });
    const handleReplay = async () => {
        if (isElevenlabsEffective) {
            await TrackPlayer.add({
                id: 'trackId',
                url: outputPath,
                title: 'Track Title',
                artist: 'Track Artist',
            });
            await TrackPlayer.play();
        } else {
            Tts.speak(text);
        }
    }
    useEffect(() => {
        return () => {
            if (isElevenlabsEffective) {
                const cleanup = async () => {
                    TrackPlayer.pause;
                    TrackPlayer.reset;
                }
                cleanup();
            } else {
                Tts.stop();
                Tts.removeAllListeners('tts-start');
            }
        }
    }, []);


    return (
        <TouchableOpacity
            style={styles.audioReplayButton}
            disabled={isReplayPushed}
            onPress={() => {
                setIsReplayPushed(!isReplayPushed);
                handleReplay();
                console.log('audio replay button pushed');
            }
            }>
            <Iconify icon="icon-park-solid:replay-music" size={20} color="#111111" />
        </TouchableOpacity>
    );
};
export default AudioReplay;

const styles = StyleSheet.create({
    audioReplayButton: {
        flexDirection: 'row',
    }
});