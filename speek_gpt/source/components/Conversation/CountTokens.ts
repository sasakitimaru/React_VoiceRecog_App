import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../src/graphql/mutations';

async function CountTokens(userId: string, newTokenCount: number) {
  const userDetails = {
    id: userId,
    usedTokens: newTokenCount,
  };

  try {
    await API.graphql(graphqlOperation(updateUser, { input: userDetails }));
    console.log('Tokens updated successfully');
  } catch (error) {
    console.log('Error updating tokens:', error);
  }
}
export default CountTokens;
