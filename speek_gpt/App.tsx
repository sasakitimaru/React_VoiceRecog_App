import React,{ useState, useEffect } from 'react';
import Navigation from './Navigation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Auth } from 'aws-amplify';

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
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const checkUserAuthentication = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
        
  useEffect(() => {
    requestMicrophonePermission();
  }, []);
  useEffect(() => {
    checkUserAuthentication();
  }, []);
  return <Navigation IsAuthenticated={IsAuthenticated} />
};

export default App;
