import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PlanBox from './planBox';
// import { Iconify } from 'react-native-iconify';

type PlanViewProps = {
    PlanElement: {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string[];
    };
};
const PlanView:React.FC<PlanViewProps> = ({PlanElement}) => {
    return (
        <View style={styles.registerplanContainer}>
            <Text style={styles.planheader}>{PlanElement.planTitle+`に登録する`}</Text>
            <View style={styles.plancontainer}>
                <PlanBox isplanPremium={PlanElement.isPlanPremium} planprice={`1ヶ月${PlanElement.planPrice[0]}円`} />
                <PlanBox isplanPremium={PlanElement.isPlanPremium} planprice={`3ヶ月${PlanElement.planPrice[1]}円`} />
                <PlanBox isplanPremium={PlanElement.isPlanPremium} planprice={`6ヶ月${PlanElement.planPrice[2]}円`} />
            </View>
        </View>
    );
};
export default PlanView;

const styles = StyleSheet.create({
    registerplanContainer: {
        flex: 0.80,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#D9E5FF',
        borderRadius: 10,
        width: '80%',
    },
    plancontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 30,
        margin: 15,
    },
    planheader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '5%',
        color: '#136FFF',
    },
});