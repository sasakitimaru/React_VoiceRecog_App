import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TopicBox from './TopicBox';
import { FlatList } from 'react-native-gesture-handler';
import data from '../prompt.json';

const Test = () => {
    const [topic, setTopic] = useState<String[]>([]);
    const [cnt, setCnt] = useState<number>(0);
    const setTopicRandom = () => {
        setTopic([]);
        for (let i = 0; i < 8; i++){
            // let tmp = Math.floor(Math.random() * data.length);
            setTopic((prev) => [...prev, data[(cnt+i)%100].topic_EN]);
        }
        setCnt((prev) => prev+8);
    };
    useEffect(() => {
        setTopicRandom();
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={topic}
                renderItem={({ item }) => (<TopicBox tmpTopic={item} setTopic={setTopic} />)}
            />
            <TouchableOpacity onPress={() => setTopicRandom()}>
                <Text>Flush</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

