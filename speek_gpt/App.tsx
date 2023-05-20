import React, { useState, useEffect, createContext } from 'react';
import Navigation from './Navigation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Auth } from 'aws-amplify';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { store as Store } from './source/redux/store/userStore';
import { initializePayment, subscribePurchaseError, subscribePurchaseUpdate, unsubscribePurchaseError, unsubscribePurchaseUpdate } from './src/services/IAPService';
import { Subscription, finishTransaction, getReceiptIOS, validateReceiptIos } from 'react-native-iap';
// import { useDispatch } from 'react-redux';
import { changePlanAction } from './source/redux/user/useractions';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from './src/graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchUser from './source/components/History/FetchUser';
import { initializeStateAction } from './source/redux/Plan/planactions';

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalVisibleContext = createContext<ModalVisibleContextProps>({
  modalVisible: false,
  setModalVisible: () => { },
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
  const [products, setProducts] = useState<Subscription[] | null>([]);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    initializePayment().then(response => setProducts(response));
    subscribePurchaseUpdate(async (purchase: any) => {
      console.log('purchaseUpdatedListener', purchase);
      if (purchase) {
        // finish the transaction
        await finishTransaction(purchase);
        getAndStoreReceipt();
      }

    });

    subscribePurchaseError((error: any) => {
      console.log('purchaseErrorListener', error);
      // Handle the error when purchase failed
    });

    return () => {
      unsubscribePurchaseUpdate();
      unsubscribePurchaseError();
    };
  }, []);
  const getAndStoreReceipt = async () => {
    const receipt = await getReceiptIOS({});
    console.log('receipt', receipt)
    if (receipt) {
      await AsyncStorage.setItem('receipt', receipt);
      const isValidate = await validateReceipt();
      console.log("chekc isValidate", isValidate)
      if (isValidate) {
        console.log('isValidate', isValidate)
        updateUserPlan();
      }
    }
  };

  useEffect(() => {
    // dispatch(initializeStateAction(products))
    console.log('products', products);

  }, [products]);

  const updateUserPlan = async () => {
    const user = await fetchUser();
    try {
      const planData = {
        id: user.id,
        usedElevenTokens: 0,
        usedTokens: 0,
        plan: true ? 'premium' : 'standard', //isplanpremiumの処理は撮ってきたプロダクトの内容を反映するよう変更必要
        planRegisteredDate: Date.now(),
      };
      try {
        await API.graphql(
          graphqlOperation(updateUser, { input: planData })
        );
        const plan = true ? 'premium' : 'standard'; //isplanpremiumの処理は撮ってきたプロダクトの内容を反映するよう変更必要
        // console.log('dispatch_plan', plan);
        // dispatch(changePlanAction(plan));
        // console.log('resetData success ');
      } catch (error) {
        console.log('error: ', error);
      }
    } catch (error) {
      console.log('error', error);
    }
    setShowLoading(false);
  };

  const validateReceipt = async () => {
    const receipt = await AsyncStorage.getItem('receipt');
    if (receipt) {
      const newReceipt = await getReceiptIOS({});
      const validated = await validateReceiptIos({
        receiptBody: {
          'receipt-data': newReceipt,
          password: 'bb14da9e1dc84352990a98f3d6b4080c',
        },
        isTest: __DEV__,
      })
      if (validated !== false && validated.status === 0) {
        await AsyncStorage.setItem('receipt', newReceipt);
        return true;
      } else {
        await AsyncStorage.removeItem('receipt');
      }
    }
    return false;
  };

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
      <ActivityIndicator size="large" /> :
      <Provider store={store}>
        <ModalVisibleContext.Provider value={{ modalVisible, setModalVisible }}>
          <Navigation IsAuthenticated={IsAuthenticated} />
        </ModalVisibleContext.Provider>
      </Provider>
  );
};

export default App;
