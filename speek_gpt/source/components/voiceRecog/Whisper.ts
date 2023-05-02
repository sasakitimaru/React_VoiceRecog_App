import { API } from 'aws-amplify';
import RNFS from 'react-native-fs';

type WhisperProps = (filePath: string) => Promise<void>;

const whisper: WhisperProps = async (filePath) => {
  const path = '/whisper';
  const apiName = 'GPTGateWay';

  const base64Audio = await RNFS.readFile(filePath, 'base64');

  const data = {
    body: {
      file: base64Audio,
      type: 'audio/m4a',
      name: 'tmp.m4a',
    },
  };

  try {
    const response = await API.post(apiName, path, data);
    console.log('res:', response);
    return response.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default whisper;
