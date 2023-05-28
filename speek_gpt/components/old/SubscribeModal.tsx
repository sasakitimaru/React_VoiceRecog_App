import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActionSheetIOS, Alert, Modal } from 'react-native';
import { initializePayment, purchaseSubscription, subscribePurchaseUpdate, subscribePurchaseError, unsubscribePurchaseUpdate, unsubscribePurchaseError } from '../../src/services/IAPService';
import { Subscription } from 'react-native-iap';
import { useSelector } from 'react-redux';

type SubscribeModalProps = {
    isplanPremium: boolean;
    planprice: string;
    visible: boolean;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isplanPremium, planprice, visible }) => {
    const [products, setProducts] = useState<Subscription[] | null>([]);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    useEffect(() => {
        initializePayment().then(response => setProducts(response));

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

    const purchase = async (sku: string) => {
        setShowLoading(true);
        purchaseSubscription(sku).then(response => {
            console.log('purchaseSubscription', response);
            setIsPurchasing(true);
            setShowLoading(false);
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }
            }>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            purchase('com.speek.premium');
                        }
                        }>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default SubscribeModal;

const styles = StyleSheet.create({
    premiumPlanview: {
        backgroundColor: '#136FFF',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    standardPlanview: {
        backgroundColor: '#F2F2F2',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    planviewtext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        height: '80%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
