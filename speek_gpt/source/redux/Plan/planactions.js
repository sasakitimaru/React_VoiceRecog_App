export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const initializeStateAction = (planRate,planName,planDescription) => {
    return {
        type: INITIALIZE_STATE,
        payload: {
            planRate: planRate,
            planName: planName,
            planDescription: planDescription,
        }
    }
}