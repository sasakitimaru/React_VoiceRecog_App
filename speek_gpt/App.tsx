import React, { useState, useEffect, createContext } from 'react';
import Navigation from './Navigation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Auth } from 'aws-amplify';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
// import TrackPlayer, { IOSCategory, IOSCategoryOptions } from 'react-native-track-player';
import { store as Store } from './source/redux/store/userStore';

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalVisibleContext = createContext<ModalVisibleContextProps>({
  modalVisible: false,
  setModalVisible: () => {},
});

export const store = Store;

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
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkUserAuthentication = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      // console.log('user: ', user)
      if (user) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   async function setupAudioSession() {
  //     try {
  //       await TrackPlayer.setupPlayer({
  //         iosCategory: IOSCategory.Playback,
  //         // iosCategoryMode: IOSCategoryMode.SpokenAudio,
  //         iosCategoryOptions: [IOSCategoryOptions.MixWithOthers],
  //       });
  //     } catch (error) {
  //       console.error("Error setting audio session:", error);
  //     }
  //   }

  //   setupAudioSession();
  // }, []);

  useEffect(() => {
    requestMicrophonePermission();
  }, []);
  useEffect(() => {
    checkUserAuthentication();
  }, []);
  return (
    loading ?
      <ActivityIndicator size="large" /> :
      <Provider store={store}>
        <ModalVisibleContext.Provider value={{ modalVisible, setModalVisible }}>
         <Navigation IsAuthenticated={IsAuthenticated} />
        </ModalVisibleContext.Provider>
      </Provider>
  );
};

export default App;
