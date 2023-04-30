import {API, graphqlOperation} from 'aws-amplify';
import {updateUser} from '../../src/graphql/mutations';
import UUID from 'react-native-uuid';
import fetchUser from './FetchUser';

type Message = {
    isUser: boolean;
    text: string;
}

const sendMessage = async (_id: string, message: Message) => {
    const newuuid = UUID.v4();
    const currentUser = await fetchUser();
    const userId = currentUser.id;
    const currentUserChecked = (currentUser.conversations || [])
  
    if (!currentUser) {
      console.error(`Could not find user with id: ${userId}`);
      return;
    }
  
    const existingConversationEntryIndex = currentUserChecked.findIndex(
      (entry) =>{ 
        // console.log('entry.sectionID:', entry.sectionID);
        // console.log('_id:', _id)
        return entry.sectionID == _id 
    }
    );
  
    let updatedConversations;
    // console.log('currentUser:', currentUser);
    // console.log('existingConversationEntryIndex:', existingConversationEntryIndex);
    // console.log('updatedConversations:', updatedConversations);
    
    if (existingConversationEntryIndex !== -1) {
      // Update existing ConversationEntry
      updatedConversations = [...currentUserChecked];
      updatedConversations[existingConversationEntryIndex] = {
        ...updatedConversations[existingConversationEntryIndex],
        timestamp: new Date().toISOString(),
        conversation: [
          ...updatedConversations[existingConversationEntryIndex].conversation,
          {
            messageID: newuuid,
            isUser: message.isUser,
            message: message.text,
            timestamp: new Date().toISOString(),
          },
        ],
      };
    } else {
      // Add new ConversationEntry
      updatedConversations = [
        ...currentUserChecked,
        {
          sectionID: _id,
          timestamp: new Date().toISOString(),
          conversation: [
            {
              messageID: newuuid,
              isUser: message.isUser,
              message: message.text,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      ];
    }
  
    try {
      const messageData = {
        id: userId,
        conversations: updatedConversations,
      };
  
      await API.graphql(
        graphqlOperation(updateUser, {
          input: messageData,
        })
      );
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };
  export default sendMessage;
  