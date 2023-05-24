import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { UnderMenuBar } from './components';
import Setting from './components/Setting';
import ConversationList from './components/ConversationList';
import { useNavigation } from '@react-navigation/native';
// import Test from './Test/testfield';
import fetchUser from './components/History/FetchUser';
import { initializeStateAction } from './redux/user/useractions';
import Calendar from './components/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { initializePlanStateAction } from './redux/Plan/planactions';
import { initializePayment, subscribePurchaseError, subscribePurchaseUpdate, unsubscribePurchaseError, unsubscribePurchaseUpdate } from '../src/services/IAPService';
import { Subscription, SubscriptionIOS, finishTransaction } from 'react-native-iap';
import ValidateReceipt from './components/home/modal/ValidateReceipt';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Subscription[] | null>([]);
  const [purchaseError, setPurchaseError] = useState<string>('');
  const [PageName, setPageName] = useState<String>('Home');
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<ConversationList />);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [latestPurchase, setLatestPurchase] = useState<Subscription | null>(null);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // const selecter = useSelector((state: any) => state);
  useEffect(() => {
    navigate.setOptions({
      headerShown: true,
      headerLeft: null,
    });
  }, []);
  useEffect(() => {
    fetchUser().then((user) => {
      const { email, plan, usedTokens, usedElevenTokens } = user;
      dispatch(initializeStateAction(email, usedTokens, usedElevenTokens, plan));
    });

    initializePayment().then(response => setProducts(response));

    subscribePurchaseError((error: any) => {
      console.log('purchaseErrorListener', error);
      setPurchaseError(error);
      return;
    });
    subscribePurchaseUpdate(async (purchase: any) => {
      console.log('purchaseUpdatedListener', purchase);
      if (purchase) {
        // finish the transaction
        if (purchaseError) {
          console.log('purchaseCanceled', purchaseError)
          Alert.alert('購入が中断されました', purchaseError, [{ text: 'OK' }]);
          setPurchaseError('');
          return;
        }
        console.log('start the transaction', purchase.transactionReceipt.expires_date_ms)
        await finishTransaction({ purchase });
        console.log('finish the transaction', purchase.productId)
        setLatestPurchase(purchase);
        setIsRestoring(true);
      }

    });
    return () => {
      unsubscribePurchaseUpdate();
      unsubscribePurchaseError();
    };
  }, []);

  useEffect(() => {
    // console.log('products', products);
    if (products && products.length > 0) {
      dispatch(initializePlanStateAction(products[0].localizedPrice, products[0].title, products[0].description))
      dispatch(initializePlanStateAction(products[1].localizedPrice, products[1].title, products[1].description))
    }
  }, [products]);

  useEffect(() => {
    switch (PageName) {
      case 'Home':
        setCurrentComponent(<ConversationList />);
        break;
      case 'History':
        setCurrentComponent(<Calendar />);
        break;
      case 'Setting':
        setCurrentComponent(<Setting />);
        break;
    }
  }, [PageName]);

  return (
    <>
      {isRestoring && (
        <ValidateReceipt
          purchase={latestPurchase}
          isRestoring={isRestoring}
          setIsRestoring={setIsRestoring}
        />
      )}
      <View style={styles.containerMain}>
        <View style={styles.contentView}>
          {currentComponent}
        </View>
        <View style={styles.bottomView}>
          <SafeAreaView>
            <UnderMenuBar setPageName={setPageName}></UnderMenuBar>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    flex: 1,
    width: '100%',
    height: '80%',
    paddingBottom: '18%',
  },
  bottomView: {
    width: '100%',
    height: '11%',
    backgroundColor: '#DCDCDC',
    // borderTopColor: 'black',
    // borderTopWidth: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});