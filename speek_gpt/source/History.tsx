import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';
import fetchUser from './History/FetchUser';
import { useNavigation } from '@react-navigation/native';

type conversationsHistory = {
    sectionID: string;
    timestamp: string;
    conversation: conversation;
}

type conversation = {
    messageID: string;
    isUser: boolean;
    message: string;
    timestamp: string;
}[]


const History = () => {
    const navigation = useNavigation();
    const [conversationsHistory, setConversationsHistory] = useState<conversationsHistory[]>([]);
    // const messages = [{"isUser": true, "text": "hello"}, {"isUser": false, "text": "Hello there! I'm excited to help you improve your English skills. What area would you like to focus on first?"}];
    const exportFetchedUser = (props) => {
        const item:conversationsHistory = props.item.conversation;
        // console.log('item:conversationHistory =', item);
        // item.conversation.map((conversation, index) => {
        //     console.log('cnt: ', index, '\nconversation_map_item: ', conversation.message);
        // })
        navigation.navigate('ChatHistory', {props: item});

    }

    useEffect(() => {
        const asyncfetchuser = async () => {
            const currentUser = await fetchUser();
            // console.log('currentUsertmp: ', currentUsertmp);
            if(!currentUser){
                console.error("User not found:", currentUser.id);
            } else {
                setConversationsHistory(currentUser.conversations)
            }
        }
        asyncfetchuser();
    }, []);

    // console.log('conversationsHistory: ', conversationsHistory[0]);

    return(
        <View style={styles.container}>
            <FlatList
                data={conversationsHistory}
                renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => exportFetchedUser({item})}
                    style={styles.listItem}
                >
                    <Text>{item.timestamp}</Text>
                </TouchableOpacity>
                )}
                keyExtractor={(item) => item.sectionID}
            />
        </View>
    )
};
export default History;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    listItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      padding: 20,
    },
    listItemText: {
      fontSize: 18,
    },
});