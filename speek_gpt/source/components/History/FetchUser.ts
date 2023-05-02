import { API, Auth, graphqlOperation } from 'aws-amplify';
import {getUser} from '../../../src/graphql/queries';

const fetchUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;
    try {
      const response = await API.graphql(graphqlOperation(getUser, {id: userId}));
      return response.data.getUser;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
};
export default fetchUser;