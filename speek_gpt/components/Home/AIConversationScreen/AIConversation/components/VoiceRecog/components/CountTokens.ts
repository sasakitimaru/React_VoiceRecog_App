import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../../../../../src/graphql/mutations';
import { plusTokenAction, plusElevenTokenAction } from '../../../../../../redux/user/useractions';
import { User } from '../../../../../../Subscription/Plan.type';

// 通常トークンのカウント
export const CountTokens = (userId: string, newTokenCount: number) => {
  // thunkを使って非同期のディスパッチを行う。リターンの中に書いて処理と結果をパッケージとしてreduxに渡す。reduxでは非同期処理は行えず、dispatchはすぐに行われることを期待しており、全ての処理は同期的に行われる。
  return async (dispatch: any, getState: any) => {
    const user: User = getState().user;
    const userDetails = {
      id: userId,
      usedTokens: user.token + newTokenCount,
    };
    dispatch(plusTokenAction(user.token + newTokenCount));
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