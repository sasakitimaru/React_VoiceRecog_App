import React,{ useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, FlatList} from 'react-native';
import { Auth } from 'aws-amplify';

type messageHistory = {
    
}

const ChatHistory = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const [messageHistory, setMessageHistory] = useState([]);