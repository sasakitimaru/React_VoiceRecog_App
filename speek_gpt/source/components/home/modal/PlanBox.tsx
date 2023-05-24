import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purchaseSubscription } from '../../../../src/services/IAPService';
import { getAvailablePurchases } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../Plan.type';
import ValidateReceipt from './ValidateReceipt'

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
    const [latestPurchase, setLatestPurchase] = useState<any>(null);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
    const [isRestoring, setIsRestoring] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const user: User = useSelector((state: any) => state.user);
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
    const handlePurchase = async () => {
        if (product) {
            if ((product === 'speechableStandard') && (user.plan === 'premium' || user.plan === 'standard')) {
                console.log('you are already subscribed');
                return;
            }
            if ((product === 'speechablePremium') && (user.plan === 'premium')) {
                console.log('You have already purchased this item.');
                return;
            }
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
                if (restoredPurchases && restoredPurchases.length > 0) {
                    const sortedPurchases = restoredPurchases.sort((a, b) => b.transactionDate - a.transactionDate);
                    setLatestPurchase(sortedPurchases[0]);
                    setIsRestoring(true);
                } else if (restoredPurchases.length === 0) {
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
            {isRestoring && (
                <ValidateReceipt
                    purchase={latestPurchase}
                    isRestoring={isRestoring}
                    setIsRestoring={setIsRestoring}
                    fromPlanBox={true}
                />
            )}
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
