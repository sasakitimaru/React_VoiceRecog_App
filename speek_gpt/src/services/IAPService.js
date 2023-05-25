import { Platform } from 'react-native';
import { initConnection, getSubscriptions, purchaseUpdatedListener, purchaseErrorListener, requestSubscription } from 'react-native-iap';

const itemSubs = Platform.select({
  ios: ['speechableStandard','speechablePremium'],  
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export const initializePayment = async () => {
  try {
    await initConnection();
    // console.log("initialize:", itemSubs)
    const products = await getSubscriptions({skus: itemSubs});
    return products;
  } catch (err) {
    console.error("initializePayment error", err);
    return null;
  }
}

export const purchaseSubscription = async (productId) => {
  try {
    console.log("purchaseSubscription:", productId)
    await requestSubscription(productId);
  } catch (err) {
    console.error("purchaseSubscription error", err);
  }
}

export const subscribePurchaseUpdate = (callback) => {
  purchaseUpdateSubscription = purchaseUpdatedListener(callback);
}

export const subscribePurchaseError = (callback) => {
  purchaseErrorSubscription = purchaseErrorListener(callback);
}

export const unsubscribePurchaseUpdate = () => {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
    purchaseUpdateSubscription = null;
  }
}

export const unsubscribePurchaseError = () => {
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = null;
  }
}
