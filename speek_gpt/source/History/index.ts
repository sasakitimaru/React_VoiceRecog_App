import {API, graphqlOperation, Auth} from 'aws-amplify';
import {updateUser} from '../../src/graphql/mutations';
import {getUser} from '../../src/graphql/queries';
import UUID from 'react-native-uuid';

type Message = {
    isUser: boolean;
    text: string;
}
const fetchUser = async (userId) => {
    try {
      const response = await API.graphql(graphqlOperation(getUser, {id: userId}));
      return response.data.getUser;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
};

const sendMessage = async (id: string, message: Message) => {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;
    const newuuid = UUID.v4();
    const currentUser = await fetchUser(userId);
    if (!currentUser) {
        console.error(`Could not find user with id: ${userId}`);
        return;
    }
    console.log('currentUser:',currentUser)
    try {
        const messageData = {
            id: userId,
            conversations: [
                ...(currentUser.conversations || []),
                {
                    sectionID: id,
                    timestamp: new Date().toISOString(),
                    conversation: {
                        messageID: newuuid,
                        isUser: message.isUser,
                        message: message.text,
                        timestamp: new Date().toISOString(),
                    },
                },
            ],
        };
        // console.log('messageData:',messageData)
        console.log('debugging:', message.text)
        console.log('messageobject:',messageData.conversations[0].conversation)
        await API.graphql(graphqlOperation(updateUser, { input: messageData }));
    } catch (error) {
        console.error('Error saving message:', error);
    }
};
export default sendMessage;