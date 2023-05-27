import AudioRecorderPlayer,{ AudioSet,AudioEncoderAndroidType, AudioSourceAndroidType ,AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
// import RNFS from 'react-native-fs';

const audioRecorderPlayer = new AudioRecorderPlayer();
const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};

const audioFile = 'tmp.m4a';
// console.log('audioSet', audioSet);
// const audioFile = `${RNFS.DocumentDirectoryPath}/tmp.m4a`;

// 録音の開始
export const startRecording = async () => {
  await audioRecorderPlayer.startRecorder(audioFile, audioSet);
};

// 録音の停止
export const stopRecording = async () => {
  const recordedFilePath = await audioRecorderPlayer.stopRecorder();
  console.log('recordedFilePath', recordedFilePath)
  return recordedFilePath;
};
