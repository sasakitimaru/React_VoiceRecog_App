import React, { useEffect, useState, useContext, useDeferredValue } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';
import UsedRateCircle from './UsedRateCircle';
import PurchaseModalView from '../home/PurchaseModalView';
import { ModalVisibleContext } from '../../../App';
import { useSelector } from 'react-redux';
import { User, tokenlimit } from '../../Plan.type'

type ModalVisibleContextProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPlan = () => {
    const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);

    const user: User = useSelector((state: any) => state.user);
    // console.log('user: ', user)
    let token = user.token;
    let eleventoken = user.eleventoken;
    let plan = user.plan;
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Iconify icon="material-symbols:arrow-back-ios-new" size={30} color="#000000" />
                </TouchableOpacity>
            ),
            headerTitle: 'あなたのプラン',
        });
    }, []);

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>{'現在のプラン：' + plan}</Text>
            <Text style={styles.hText}>スタンダードトークン</Text>
            <Text style={{ marginTop: 10 }}>{Math.min(token, tokenlimit[plan].token) + '/' + tokenlimit[plan].token}</Text>
            <UsedRateCircle user={user} isElevenlabs={false} />
            <Text style={styles.hText}>ネイティブトークン</Text>
            <Text style={{ marginTop: 10 }}>{Math.min(eleventoken, tokenlimit[plan].eleventoken) + '/' + tokenlimit[plan].eleventoken}</Text>
            <UsedRateCircle user={user} isElevenlabs={true} />
            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={styles.changePlan}>プランを変更する</Text>
            </TouchableOpacity>
            <PurchaseModalView />
        </View>
    );
};
export default ConfirmPlan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    headerText: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    hText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    changePlan: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
    },
});
