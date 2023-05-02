import {API, graphqlOperation} from 'aws-amplify';
import {updateUser} from '../../src/graphql/mutations';
import UUID from 'react-native-uuid';
import fetchUser from './FetchUser';

type Message = {
    isUser: boolean;
    message: string;
}

type MessageList = Message[];

const sendMessage = async (_id: string, messageList: MessageList) => {
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
        return entry.sectionID == _id 
    }
    );
  
    let updatedConversations;
    
    if (existingConversationEntryIndex !== -1) {
      // Update existing ConversationEntry
      updatedConversations = [...currentUserChecked];
      console.log('existingConversationEntryIndex:', existingConversationEntryIndex)
      updatedConversations[existingConversationEntryIndex] = {
        sectionID: _id,
        timestamp: new Date().toISOString(),
        conversation: messageList
      };
      console.log ('多分この中には入らないと思う:', messageList)
      console.log('id:' , _id)
    } else {
      // Add new ConversationEntry
      updatedConversations = [
        ...currentUserChecked,
        {
          sectionID: _id,
          timestamp: new Date().toISOString(),
          conversation: messageList
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
  