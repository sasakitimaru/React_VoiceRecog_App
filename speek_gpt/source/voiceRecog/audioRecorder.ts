import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';

// 録音設定
const audioOptions = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  wavFile: `tmp.wav`,
};

// 録音の開始
export const startRecording = () => {
  AudioRecord.init(audioOptions);
  AudioRecord.start();
};

// 録音の停止
export const stopRecording = async () => {
  const audioFile = await AudioRecord.stop();
  return audioFile;
};
