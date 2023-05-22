import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './source/SignUp';
import Verify from './source/Verify';
import SignIn from './source/SignIn';
import Home from './source/Home';
import ChatHistory from './source/components/History/ChatHistory';
import AI_conversation from './source/components/AI_conversation';
import History from './source/components/History';
import InquiryForm from './source/components/account/InquiryForm';
import ConfirmPlan from './source/components/account/ConfirmPlan';
import { initializePlanStateAction} from './source/redux/Plan/planactions';
import { changePlanAction } from './source/redux/user/useractions';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from './src/graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchUser from './source/components/History/FetchUser';
import { initializePayment, subscribePurchaseError, subscribePurchaseUpdate, unsubscribePurchaseError, unsubscribePurchaseUpdate } from './src/services/IAPService';
import { SubscriptionIOS, finishTransaction, getReceiptIOS, validateReceiptIos } from 'react-native-iap';
import { useDispatch,useSelector } from 'react-redux';

type NavigationProps = { IsAuthenticated: boolean };

const Stack = createStackNavigator();
const Navigation: React.FC<NavigationProps> = ({ IsAuthenticated }) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<SubscriptionIOS[] | null>([]);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const planContent = useSelector((state: any) => state.plan);

  useEffect(() => {
    initializePayment().then(response => setProducts(response));
    subscribePurchaseUpdate(async (purchase: any) => {
      // console.log('purchaseUpdatedListener', purchase);
      if (purchase) {
        // finish the transaction
        console.log('start the transaction',purchase)
        await finishTransaction({purchase});
        console.log('finish the transaction',purchase.productId)
        getAndStoreReceipt(purchase);
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
  const getAndStoreReceipt = async (purchase) => {
    const receipt = await getReceiptIOS({});
    if (receipt) {
      await AsyncStorage.setItem('receipt', receipt);
      const isValidate = await validateReceipt();
      console.log("chekc isValidate", isValidate)
      if (isValidate) {
        console.log('isValidate', isValidate)
        updateUserPlan(purchase);
      }
    }
  };

  useEffect(() => {
    // console.log('products', products);
    if(products && products.length > 0) {
      dispatch(initializePlanStateAction(products[0].localizedPrice, products[0].title, products[0].description))
      dispatch(initializePlanStateAction(products[1].localizedPrice, products[1].title, products[1].description))
    }
  }, [products]);

  const updateUserPlan = async (purchase: any) => {
    const user = await fetchUser();
    try {
      console.log('productId', purchase)
      const isPlanPremium = purchase.productId === "speechablePremium" ? true : false;
      const planData = {
        id: user.id,
        usedElevenTokens: 0,
        usedTokens: 0,
        plan: isPlanPremium ? 'premium' : 'standard', 
        planRegisteredDate: purchase.transactionDate,
      };
      try {
        await API.graphql(
          graphqlOperation(updateUser, { input: planData })
        );
        const plan = isPlanPremium ? 'premium' : 'standard'; 
        // console.log('dispatch_plan', plan);
        dispatch(changePlanAction(plan));
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


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={IsAuthenticated ? 'Home' : 'SignUp'}
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AI_conversation" component={AI_conversation} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name="ChatHistory" component={ChatHistory} />
        <Stack.Screen name="InquiryForm" component={InquiryForm} />
        <Stack.Screen name="ConfirmPlan" component={ConfirmPlan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
