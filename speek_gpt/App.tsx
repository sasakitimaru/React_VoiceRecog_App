import React, { useState, useEffect, createContext } from 'react';
import Navigation from './Navigation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Auth } from 'aws-amplify';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { store as Store } from './source/redux/store/userStore';

export type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// export type HasRunUpdateSubscriptionProps = {
//   hasRunUpdateSubscription: boolean;
//   setHasRunUpdateSubscription: React.Dispatch<React.SetStateAction<boolean>>;
// };

export const ModalVisibleContext = createContext<ModalVisibleContextProps>({
  modalVisible: false,
  setModalVisible: () => { },
});

// export const hasRunUpdateContext = createContext<HasRunUpdateSubscriptionProps>({
//   hasRunUpdateSubscription: false,
//   setHasRunUpdateSubscription: () => { },
// });

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
  const [hasRunUpdateSubscription, setHasRunUpdateSubscription] = useState<boolean>(false);
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

  useEffect(() => {
    requestMicrophonePermission();
  }, []);
  useEffect(() => {
    checkUserAuthentication();
  }, []);
  return (
    loading ?
      <ActivityIndicator size="large" style={{ justifyContent: 'center', alignItems: 'center' }} /> :
      <Provider store={store}>
        <ModalVisibleContext.Provider value={{ modalVisible, setModalVisible }}>
          <Navigation IsAuthenticated={IsAuthenticated} />
        </ModalVisibleContext.Provider>
      </Provider>
  );
};

export default App;
