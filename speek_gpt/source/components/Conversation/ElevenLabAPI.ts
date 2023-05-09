import axios from 'axios';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import TrackPlayer from 'react-native-track-player';
import { API } from 'aws-amplify';


const Elevenlabs = async (text: string) => {
    const path = '/Elevenlabs';
    const apiName = 'GPTGateWay';
    const outputPath = `${RNFS.DocumentDirectoryPath}/tmp.mp3`;
    // const [isPlaying, setIsPlaying] = useState<boolean>(false);
    try {
        console.log('text', text)
        const response = await API.post(apiName, path, { body: text });
        // console.log('response', response);
        await RNFS.writeFile(outputPath, Buffer.from(response, 'binary').toString('base64'), 'base64');
        // console.log('response', outputPath);
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
export default Elevenlabs;