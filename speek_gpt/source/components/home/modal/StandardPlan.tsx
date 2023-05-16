import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlanView from './PlanView';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string[];
}
const StandardPlanBox:React.FC = () => {
    const PlanElement:PlanElement = {
        isPlanPremium: false,
        planTitle: 'スタンダードプラン',
        planPrice: ['990','2,200','3,800'],
    };
    return (
        <PlanView PlanElement={PlanElement}/>
    );
};
export default StandardPlanBox;