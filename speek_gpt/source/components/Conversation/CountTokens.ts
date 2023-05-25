import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../src/graphql/mutations';
import { plusTokenAction, plusElevenTokenAction } from '../../redux/user/useractions';

type User = {
  token: number;
  eleventoken: number;
  plan: string;
};

export const CountTokens = (userId: string, newTokenCount: number) => {
    return async (dispatch: any, getState: any) => {
    const user: User = getState().user;
    const userDetails = {
      id: userId,
      usedTokens: user.token + newTokenCount,
    };
    console.log('beforeDispatch', user.token)
    dispatch(plusTokenAction(user.token + newTokenCount));
    console.log('afterDispatch', user.token)
    try {
      await API.graphql(graphqlOperation(updateUser, { input: userDetails }));
      console.log('Tokens updated successfully');
    } catch (error) {
      console.log('Error updating tokens:', error);
    }
  }
}

export const CountElevenTokens = (userId: string, newTokenCount: number) => {
  return async (dispatch: any, getState: any) => {
    const user: User = getState().user;
    const userDetails = {
      id: userId,
      usedElevenTokens: user.eleventoken + newTokenCount,
    };

    try {
      await API.graphql(graphqlOperation(updateUser, { input: userDetails }));
      console.log('ElevenTokens updated successfully');
      dispatch(plusElevenTokenAction(user.eleventoken + newTokenCount));
    } catch (error) {
      console.log('Error updating tokens:', error);
    }
  }
}