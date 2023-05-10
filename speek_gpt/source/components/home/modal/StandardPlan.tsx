import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlanView from './planView';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string[];
}
const StandardPlanBox:React.FC = () => {
    const PlanElement:PlanElement = {
        isPlanPremium: true,
        planTitle: 'スタンダードプラン',
        planPrice: ['990','2,200','3,800'],
    };
    return (
        <PlanView PlanElement={PlanElement}/>
    );
};
export default StandardPlanBox;