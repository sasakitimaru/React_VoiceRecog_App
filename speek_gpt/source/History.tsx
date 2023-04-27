import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, FlatList} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import fetchUser from './History/FetchUser';

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
}


const History = () => {
    const [conversationsHistory, setConversationsHistory] = useState<conversationsHistory[]>([]);

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

    // console.log('conversationsHistory: ', conversationsHistory);

    return(
        <FlatList
            data={"conversationsHistory"}
            renderItem={({ item }) => <Text>{item}</Text>}
        >
        </FlatList>
    )
};
export default History;