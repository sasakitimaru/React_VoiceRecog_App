export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const initializeStateAction = (email,token,eleventoken,plan) => {
    return {
        type: INITIALIZE_STATE,
        payload: {
            email: email,
            token: token,
            eleventoken: eleventoken,
            plan: plan
        }
    }
}

export const PLUS_TOKEN = 'PLUS_TOKEN';
export const plusTokenActssion = (usedToken) => {
    return {
        type: PLUS_TOKEN,
        payload: {
            token: usedToken
        }
    }
}

export const PLUS_ELEVENTOKEN = 'PLUS_ELEVENTOKEN';
export const plusElevenTokenAction = (usedElevenToken) => {
    return {
        type: PLUS_ELEVENTOKEN,
        payload: {
            eleventoken: usedElevenToken
        }
    }
}

export const CHANGE_PLAN = 'CHANGE_PLAN';
export const changePlanAction = (plan) => {
    return {
        type: CHANGE_PLAN,
        payload: {
            token: 0,
            eleventoken: 0,
            plan: plan
        }
    }
}

export const RESET_TOKENLIMIT = 'RESET_TOKENLIMIT';
export const resetTokenLimitAction = () => {
    return {
        type: RESET_TOKENLIMIT,
        payload: {
            token: 0,
            eleventoken: 0
        }
    }
}