import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type PlanBoxProps = {
    isplanPremium: boolean;
    planprice: string;
};
const PlanBox:React.FC<PlanBoxProps> = ({isplanPremium,planprice}) => {
    return (
        <View>
        <TouchableOpacity style={
            isplanPremium ? styles.premiumPlanview : styles.standardPlanview
        }>
            <Text style={styles.planviewtext}>{planprice}</Text>
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
    }
});
