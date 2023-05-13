export const PLUS_TOKEN = 'PLUS_TOKEN';
export const plusTokenAction = (usedToken) => {
    return {
        type: PLUS_TOKEN,
        payload: {
            token: usedToken
        }
    }
}

export const CHANGE_PLAN = 'CHANGE_PLAN';
export const changePlanAction = (plan) => {
    return {
        type: CHANGE_PLAN,
        payload: {
            plan: plan
        }
    }
}