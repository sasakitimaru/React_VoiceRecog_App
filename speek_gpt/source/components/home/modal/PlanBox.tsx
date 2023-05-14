import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { initializePayment, purchaseSubscription, subscribePurchaseUpdate, subscribePurchaseError, unsubscribePurchaseUpdate, unsubscribePurchaseError } from '../../../../src/services/IAPService';
import { Subscription, finishTransaction, getAvailablePurchases, getReceiptIOS, validateReceiptIos } from 'react-native-iap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { changePlanAction } from '../../../redux/user/useractions';
import fetchUser from '../../History/FetchUser';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../../src/graphql/mutations';

type PlanBoxProps = {
    isplanPremium: boolean;
    planprice: string;
};
const PlanBox: React.FC<PlanBoxProps> = ({ isplanPremium, planprice }) => {
    const [products, setProducts] = useState<Subscription[] | null>([]);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        initializePayment().then(response => setProducts(response));
        console.log('products', products);
        subscribePurchaseUpdate((purchase: any) => {
            console.log('purchaseUpdatedListener', purchase);
            // Handle the purchase, save it somewhere, validate it, etc
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

    const purchaseProcess = async (sku: string) => {
        setShowLoading(true);
        try {
            console.log('purchaseSubscription', sku);
            const purchaseResult = await purchaseSubscription({ sku });
            console.log('purchaseSubscription', purchaseResult);

            // Assuming purchaseResult is not null
            if (purchaseResult) {
                // finish the transaction
                await finishTransaction(purchaseResult);
            }

            setIsPurchasing(true);
            setShowLoading(false);
        } catch (error) {
            console.log('purchaseSubscription error', error);
            setShowLoading(false);
        }
    };
    const handlePurchase = () => {
        if (products && products.length > 0) {
            isplanPremium ? purchaseProcess(products[0].productId) : purchaseProcess(products[1].productId);
        }
    };
    const restorePurchasesProcess = async () => {
        setShowLoading(true);
        try {
            const restoredPurchases = await getAvailablePurchases();
            console.log('restoredPurchases', restoredPurchases);

            // Assuming the first purchase is the subscription
            if (restoredPurchases && restoredPurchases.length > 0) {
                const subscription = restoredPurchases[0];
                // do something with the subscription, like storing it somewhere
                // or validating it with your server
            }

            setShowLoading(false);
        } catch (error) {
            console.log('restorePurchases error', error);
            setShowLoading(false);
        }
    };

    const getAndStoreReceipt = async () => {
        const receipt = await getReceiptIOS({});
        if (receipt) {
            await AsyncStorage.setItem('receipt', receipt);
        }
    };

    const validateReceipt = async () => {
        let isValidated = false;
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
                isValidated = true;
                await AsyncStorage.setItem('receipt', newReceipt);
            } else {
                isValidated = false;
                await AsyncStorage.removeItem('receipt');
            }
        }
        return isValidated;
    };

    useEffect(() => {
        getAndStoreReceipt();
        const getresult = async () => {
            const result = await validateReceipt()
            const user = await fetchUser();
            console.log('result', result);
            if (result) {
                try {
                    const planData = {
                        id: user.id,
                        usedElevenTokens: 0,
                        usedTokens: 0,
                        plan: isplanPremium ? 'premium' : 'standard',
                        planRegisteredDate: Date.now(),
                    };
                    try {
                        await API.graphql(
                            graphqlOperation(updateUser, { input: planData })
                        );
                        const plan = isplanPremium ? 'premium' : 'standard';
                        dispatch(changePlanAction(plan));
                        // console.log('resetData success ');
                    } catch (error) {
                        console.log('error: ', error);
                    }
                } catch (error) {
                    console.log('error', error);
                }
                dispatch(changePlanAction(isplanPremium));
            }
        }
        getresult();
    }, [isPurchasing]);

    useEffect(() => {
        dispatch(changePlanAction(isplanPremium));
    }, []);
    return (
        <View>
            <TouchableOpacity
                style={
                    isplanPremium ? styles.premiumPlanview : styles.standardPlanview
                }
                onPress={() => handlePurchase()}
            >
                <Text style={styles.planviewtext}>{planprice}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => restorePurchasesProcess()}
            >
                <Text style={styles.restoretext}>以前の購入情報を復元する</Text>
            </TouchableOpacity>
        </View>
    );
};
export default PlanBox;

const styles = StyleSheet.create({
    premiumPlanview: {
        backgroundColor: '#136FFF',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    standardPlanview: {
        backgroundColor: '#FF367F',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    planviewtext: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    restoretext: {
        color: '#136FFF',
        paddingTop: '10%',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
