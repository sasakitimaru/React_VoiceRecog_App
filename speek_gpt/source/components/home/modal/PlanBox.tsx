import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purchaseSubscription } from '../../../../src/services/IAPService';
import { Subscription, getAvailablePurchases } from 'react-native-iap';
import { useDispatch } from 'react-redux';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string;
}

type PlanBoxProps = {
    planElement: PlanElement;
};
const PlanBox: React.FC<PlanBoxProps> = ({ planElement }) => {
    // const [products, setProducts] = useState<Subscription[] | null>([]);
    const [product, setProduct] = useState<string>('');
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const purchaseProcess = async (sku: string) => {
        setShowLoading(true);
        console.log('start purchaseprocess')
        try {
            // console.log('purchaseSubscription', sku);
            await purchaseSubscription({ sku });
            console.log('finish purchaseprocess')
        } catch (error) {
            console.log('purchaseSubscription error', error);
            setShowLoading(false);
        }
    };
    useEffect(() => {
        planElement.isPlanPremium ? setProduct('speechablePremium') : setProduct('speechableStandard');
    }, []);
    const handlePurchase = () => {
        console.log('products', product)
        if (product) {
            purchaseProcess(product);
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
                if (restoredPurchases && restoredPurchases.length > 0) {
                    const subscription = restoredPurchases[0];
                    console.log('subscription_restored',subscription)
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
                    planElement.isPlanPremium ? styles.premiumPlanview : styles.standardPlanview
                }
                onPress={() => handlePurchase()}
            >
                <Text style={styles.planviewtext}>{planElement.planPrice}</Text>
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
