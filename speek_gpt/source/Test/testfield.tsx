import React, { createContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import fetchUser from '../components/History/FetchUser';
import formatUTCtoJapanDate from './format';

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

type DateList = {
    [key: string]: {
        selected: boolean;
        marked: boolean;
        selectedColor: string;
    }
}
const Test = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string>('');
    const [conversationsHistory, setConversationsHistory] = useState<conversationsHistory[]>([]);
    const [DateList, setDateList] = useState<DateList>({});

    useEffect(() => {
        const asyncfetchuser = async () => {
            const currentUser = await fetchUser();
            if (!currentUser) {
                console.error("User not found:", currentUser.id);
            } else {
                setConversationsHistory(currentUser.conversations)
            }
        }
        asyncfetchuser();
    }, []);

    useEffect(() => {
        conversationsHistory.map((conversation) => {
            const timestamp = conversation.timestamp;
            const formattedDate = formatUTCtoJapanDate(timestamp);
            setDateList((prev) => {
                return {
                    ...prev,
                    [formattedDate]: {
                        selected: true,
                        marked: true,
                        selectedColor: '',
                    }
                }
            })
        })
    }, [conversationsHistory]);

    return (
        <View style={styles.container}>
        <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
                navigation.navigate('History', { date:day.dateString,conversationsHistoryProps: conversationsHistory })
            }}
            markedDates={{
                ...DateList
            }}
            pagingEnabled
            // pastScrollRange={2}
            // futureScrollRange={2}
            // scrollEnabled
            // showScrollIndicator
        />
        </View>
    );
};
export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});