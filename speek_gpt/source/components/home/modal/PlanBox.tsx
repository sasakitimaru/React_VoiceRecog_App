import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purchaseSubscription } from '../../../../src/services/IAPService';
import { Subscription, getAvailablePurchases } from 'react-native-iap';
import { useDispatch } from 'react-redux';

type PlanBoxProps = {
    isplanPremium: boolean;
    planprice: string;
};
const PlanBox: React.FC<PlanBoxProps> = ({ isplanPremium, planprice }) => {
    const [products, setProducts] = useState<Subscription[] | null>([]);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const purchaseProcess = async (sku: string) => {
        setShowLoading(true);
        try {
            // console.log('purchaseSubscription', sku);
            await purchaseSubscription({ sku });
        } catch (error) {
            console.log('purchaseSubscription error', error);
            setShowLoading(false);
        }
    };
    const handlePurchase = () => {
        console.log('products', products)
        if (products && products.length > 0) {
            isplanPremium ? purchaseProcess(products[1].productId) : purchaseProcess(products[0].productId);
        }
    };
    const restorePurchasesProcess = async () => {
        setShowLoading(true);
        try {
            const restoredPurchases = await getAvailablePurchases();
            if (restoredPurchases.length === 0) {
                // There are no purchases to restore
                console.log('There are no purchases to restore');
            } else {
                console.log('restoredPurchases', restoredPurchases[0].productId);
                console.log('restoredPurchases', restoredPurchases.length);
                // Assuming the first purchase is the subscription
                if (restoredPurchases && restoredPurchases.length > 0) {
                    const subscription = restoredPurchases[0];
                    // do something with the subscription, like storing it somewhere
                    // or validating it with your server

                } else if (restoredPurchases.length === 0) {
                    // There are no purchases to restore
                    console.log('There are no purchases to restore');
                }
            }

            setShowLoading(false);
        } catch (error) {
            console.log('restorePurchases error', error);
            setShowLoading(false);
        }
    };

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
