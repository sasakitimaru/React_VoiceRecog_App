import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlanView from './PlanView';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string[];
}
const PremiumpPlanBox:React.FC = () => {
    const PlanElement:PlanElement = {
        isPlanPremium: true,
        planTitle: 'プレミアムプラン',
        planPrice: ['3,000','8,000','15,000'],
    };
    return (
        <PlanView PlanElement={PlanElement}/>
    );
};
export default PremiumpPlanBox;