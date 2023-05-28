import React from 'react';
import PlanView from './PlanView';
import { useSelector } from 'react-redux';

type PlanElement = {
    isPlanPremium: boolean;
    planTitle: string;
    planPrice: string;
}
const PremiumpPlanBox: React.FC = () => {
    const plan = useSelector((state: any) => state.planContent);
    let isPlanPremium = false;
    let planTitle = 'データを取得できませんでした';
    let planPrice = '---';
    if (plan && plan.length > 2) {
        if (plan[1].planName === 'PremiumPlan') {
            isPlanPremium = true;
            planTitle = plan[1].planName;
            planPrice = plan[1].planRate;
        } else if (plan[2].planName === 'PremiumPlan') {
            isPlanPremium = true;
            planTitle = plan[2].planName;
            planPrice = plan[2].planRate;
        }
    }
    const planElement: PlanElement = {
        isPlanPremium: isPlanPremium,
        planTitle: planTitle,
        planPrice: planPrice,
    };
    return (
        <PlanView planElement={planElement} />
    );
};
export default PremiumpPlanBox;