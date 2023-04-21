import React,{ useEffect } from 'react';
import Navigation from './Navigation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const requestMicrophonePermission = async () => {
  const microphoneStatus = await check(PERMISSIONS.IOS.MICROPHONE);
  if (microphoneStatus !== RESULTS.GRANTED) {
    const result = await request(PERMISSIONS.IOS.MICROPHONE);
    if (result !== RESULTS.GRANTED) {
      console.log('マイクへのアクセスが拒否されました');
    }
  }
};
const App = () => {
  useEffect(() => {
    requestMicrophonePermission();
  }, []);
  return <Navigation />;
};

export default App;
