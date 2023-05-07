import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formatUTCtoJapanDate from './History/format';
import { Iconify } from 'react-native-iconify';

type conversationsHistory = {
    sectionID: string;
    topic: string;
    timestamp: string;
    conversation: conversation;
}

type conversation = {
    messageID: string;
    isUser: boolean;
    message: string;
    timestamp: string;
}[]


const History = ({ route }) => {
    const { date, conversationsHistoryProps } = route.params;
    const conversationsHistory: conversationsHistory[] = conversationsHistoryProps;
    // const [selectedDate, setSelectedDate] = useState<string>(selected);
    // console.log('selectedDate', selectedDate)
    console.log('selected_b', date)
    console.log('timestamp', formatUTCtoJapanDate(conversationsHistoryProps[0].timestamp))
    const navigation = useNavigation();
    const exportFetchedUser = (props) => {
        const item: conversationsHistory = props.item.conversation;
        navigation.navigate('ChatHistory', { props: item });
    }
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'History',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginLeft: 10 }}
                >
                    <Iconify icon="material-symbols:arrow-back-ios-new" size={30} color="#000000" />
                </TouchableOpacity>
            ),
        });
    }, []);

    const sortedArray = conversationsHistory;
    if (sortedArray !== null) {
        sortedArray.sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
    }
    let filteredArray = sortedArray
    if (filteredArray !== null) {
        filteredArray = sortedArray.filter(
            (item) => formatUTCtoJapanDate(item.timestamp) === date
        );
    }

    return (
        <View style={styles.container}>
            { filteredArray.length !== 0 ?
            <FlatList
                data={filteredArray}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => exportFetchedUser({ item })}
                        style={styles.listItem}
                    >
                        <Text>{item.topic}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.sectionID}
            />
            : 
            <View style={styles.textcontainer}>
            <Text style={styles.nohistorytext}>No history</Text>
            </View>
            }
        </View>
    )
};
export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    textcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    nohistorytext: {
        fontSize: 20,
        fontWeight: 'bold',
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