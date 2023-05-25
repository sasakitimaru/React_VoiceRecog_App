import React, { useEffect, useContext } from 'react';
import { changePlanAction } from '../../../redux/user/useractions';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../../src/graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchUser from '../../History/FetchUser';
import { getReceiptIOS, validateReceiptIos } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, View, Alert } from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import { User } from '../../../Plan.type';
import { ModalVisibleContext } from '../../../../App';

type ValidateReceiptProps = {
    purchase: any
    isRestoring: boolean
    setIsRestoring: (isRestoring: boolean) => void
    fromPlanBox?: boolean
    isNotRenewAccount?: boolean
    forSubscriptionUpdate?: boolean
}

const ValidateReceipt: React.FC<ValidateReceiptProps> = ({ purchase, isRestoring, setIsRestoring, fromPlanBox ,isNotRenewAccount, forSubscriptionUpdate }) => {
    const dispatch = useDispatch();
    const user: User = useSelector((state: any) => state.user);
    // const SharedKey = Config.SHARED_SECRET;
    const SharedKey = 'bb14da9e1dc84352990a98f3d6b4080c'
    const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
    const getAndStoreReceipt = async (purchase: any, forSubscriptionUpdate?: boolean) => {
        const receipt = await getReceiptIOS({});
        if (receipt) {
            const isValidate = await validateReceipt(receipt);
            if (isValidate) {
                console.log('isValidate', isValidate)
                const receiptInfo = await validateAppleReceipt(receipt);
                const expireDate = new Date(parseInt(receiptInfo.expires_date_ms));
                const purchaseDate = new Date(parseInt(receiptInfo.purchase_date_ms));

                // Get current date
                const currentDate = new Date();

                // Check if the plan is still valid
                const isValid = currentDate < expireDate;
                console.log('isValid', isValid);
                console.log('sharedKey', SharedKey);
                if (!fromPlanBox) {
                    console.log('forSubscriptionUpdate');
                    updateUserPlan(purchase, isNotRenewAccount, isValid, forSubscriptionUpdate=true);
                }
                else if (!isValid) {
                    Alert.alert("Error", "有効な購入情報がありません", [{ text: "OK" , onPress: () => setModalVisible(false)}]);
                    setIsRestoring(false);
                    return;
                }
                else if (user.plan === 'premium' && receiptInfo.product_id === 'speechablePremium') {
                    Alert.alert("Error", "すでにプレミアムプランに登録されています", [{ text: "OK" , onPress: () => setModalVisible(false)}]);
                    setIsRestoring(false);
                    return;
                }
                else if (user.plan === 'standard' && receiptInfo.product_id === 'speechableStandard') {
                    Alert.alert("Error", "すでにスタンダードプランに登録されています", [{ text: "OK" , onPress: () => setModalVisible(false)}]);
                    return;
                }
                else {
                    updateUserPlan(purchase, isNotRenewAccount, isValid, forSubscriptionUpdate);
                    setIsRestoring(false);
                }
            } else {
                Alert.alert("Error", "購入情報の復元に失敗しました。", [{ text: "OK" , onPress: () => setModalVisible(false)}]);
                setIsRestoring(false);
                return;
            }
        }
    };
    useEffect(() => {
        getAndStoreReceipt(purchase, forSubscriptionUpdate);
    }, []);
    const updateUserPlan = async (purchase: any, isNotRenewAccount: boolean | undefined, isValid: boolean, forSubscriptionUpdate?: boolean) => {
        const user = await fetchUser();
        const usedTokens = !isNotRenewAccount ? 0 : user.usedTokens;
        const usedElevenTokens = !isNotRenewAccount ? 0 : user.usedElevenTokens;
        try {
            const isPlanPremium = purchase.productId === "speechablePremium" ? true : false;
            const plan = isValid ? (isPlanPremium ? 'premium' : 'standard') : 'nomal';
            const planData = {
                id: user.id,
                usedElevenTokens: usedElevenTokens,
                usedTokens: usedTokens,
                plan: plan,
                planRegisteredDate: purchase.transactionDate,
            };
            try {
                await API.graphql(
                    graphqlOperation(updateUser, { input: planData })
                );
                // console.log('dispatch_plan', plan);
                dispatch(changePlanAction(usedTokens, usedElevenTokens, plan));
                const planContent = purchase.productId === "speechablePremium" ? 'プレミアムプラン' : 'スタンダードプラン';
                if (!forSubscriptionUpdate) Alert.alert(`${planContent}へようこそ`, `${planContent}が使用可能です！早速会話を始めましょう。`, [{ text: "OK" , onPress: () => setModalVisible(false)}]);
            } catch (error) {
                console.log('error: ', error);
            }
        } catch (error) {
            console.log('error', error);
            Alert.alert("Error", "購入情報の復元に失敗しました。", [{ text: "OK" , onPress: () => setModalVisible(false)}]);
        }
        setIsRestoring(false);
    };

    const validateReceipt = async (receipt: string) => {
        // const receipt = await AsyncStorage.getItem('receipt');
        if (receipt) {
            // const expiredate_test = await validateAppleReceipt(receipt);
            // console.log('expiredate_test,', expiredate_test);
            // const newReceipt = await getReceiptIOS({});
            const validated = await validateReceiptIos({
                receiptBody: {
                    'receipt-data': receipt,
                    password: SharedKey,
                },
                isTest: __DEV__,
            })
            if (validated !== false && validated.status === 0) {
                await AsyncStorage.setItem('receipt', receipt);
                return true;
            }
        }
        return false;
    };

    async function validateAppleReceipt(receipt: string | null) {
        const prodURL = 'https://buy.itunes.apple.com/verifyReceipt'
        const stagingURL = 'https://sandbox.itunes.apple.com/verifyReceipt'
        const payload = {
            "receipt-data": receipt,
            "password": SharedKey,
            "exclude-old-transactions": true,
        }
        const prodRes = await axios.post(prodURL, payload)
        if (prodRes.data && prodRes.data.status === 21007) {
            const sandboxRes = await axios.post(stagingURL, payload)
            return sandboxRes.data.latest_receipt_info[0]
        }
        return prodRes.data.latest_receipt_info[0]
    }

    return (

        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
        </View>

    )
};
export default ValidateReceipt;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        top: '-1000%',
        left: '-100%',
        right: '-100%',
        bottom: '-1000%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});