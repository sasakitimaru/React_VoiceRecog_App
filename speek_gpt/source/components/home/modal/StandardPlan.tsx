import React from 'react';
import PlanView from './PlanView';
import { useSelector } from 'react-redux';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string;
}
const StandardPlanBox: React.FC = () => {
    const plan = useSelector((state: any) => state.planContent);
    let isPlanPremium = false;
    let planTitle = 'データを取得できませんでした';
    let planPrice = '---';
    console.log('plan', plan);
    if (plan && plan.length > 2) {
        if (plan[1].planName === 'StandardPlan') {
            isPlanPremium = false;
            planTitle = plan[1].planName;
            planPrice = plan[1].planRate;
        } else if (plan[2].planName === 'StandardPlan') {
            isPlanPremium = false;
            planTitle = plan[2].planName;
            planPrice = plan[2].planRate;
        }
    }
    const planElement: PlanElement = {
        isPlanPremium: isPlanPremium,
        planTitle: planTitle,
        planPrice: planPrice,
    };
    console.log('planElement1', planElement);
    return (
        <PlanView planElement={planElement} />
    );
};
export default StandardPlanBox;