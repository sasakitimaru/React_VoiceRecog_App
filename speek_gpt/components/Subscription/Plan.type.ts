export type User = {
    plan: Plan;
    token: number;
    eleventoken: number;
};

export type Plan = 'nomal' | 'standard' | 'premium' | 'special';

export type Tokenlimit = {
    [P in Plan]: {
        token: number;
        eleventoken: number;
    };
};

export const tokenlimit: Tokenlimit = {
    nomal: {
        token: 10000,
        eleventoken: 1000,
    },
    standard: {
        token: 30000,
        eleventoken: 1000,
    },
    premium: {
        token: 50000,
        eleventoken: 30000,
    },
    special: {
        token: 9999999,
        eleventoken: 9999999,
    }
};