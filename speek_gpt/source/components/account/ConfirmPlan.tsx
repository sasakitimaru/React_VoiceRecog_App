import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';
import UsedRateCircle from './UsedRateCircle';
import PurchaseModalView from '../home/PurchaseModalView';

const ConfirmPlan = () => {
    const [isModailVisible, setIsModalVisible] = useState<boolean>(false);

    const tempUser = {
        plan: 'standard',
        token: 654,
    };
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Iconify icon="material-symbols:arrow-back-ios-new" size={30} color="#000000" />
                </TouchableOpacity>
            ),
            headerTitle: 'プラン確認',
        });
    }, []);

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.headerText}>現在のプラン：ノーマル</Text>
            <Text style={styles.hText}>スタンダードトークン</Text>
            <UsedRateCircle user={tempUser} isElevenlabs={false}/>
            <Text style={styles.hText}>ネイティブトークン</Text>
            <UsedRateCircle user={tempUser} isElevenlabs={true}/>
            <TouchableOpacity
                onPress={() => setIsModalVisible(!isModailVisible)}
            >
                <Text style={styles.changePlan}>プランを変更する</Text>
            </TouchableOpacity>
            {isModailVisible && <PurchaseModalView/>}
        </View>
    );
};
export default ConfirmPlan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff',
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
        marginBottom: 40,
    },
});
