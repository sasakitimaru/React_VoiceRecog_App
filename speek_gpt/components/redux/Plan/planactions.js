export const INITIALIZE_PLAN_STATE = 'INITIALIZE_PLAN_STATE';
export const initializePlanStateAction = (planRate,planName,planDescription) => {
    return {
        type: INITIALIZE_PLAN_STATE,
        payload: {
            planRate: planRate,
            planName: planName,
            planDescription: planDescription,
        }
    }
}