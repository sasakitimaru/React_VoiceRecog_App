import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import TopicBox from './home/TopicBox';
import data from '../prompt.json';

const ConversationList: React.FC = () => {
  const [topic, setTopic] = useState<string[]>([]);
  const [cnt, setCnt] = useState<number>(0);
  const setTopicRandom = () => {
    setTopic([]);
    for (let i = 0; i < 8; i++) {
      // let tmp = Math.floor(Math.random() * data.length);
      setTopic((prev) => [...prev, data[(cnt + i) % 100].topic_EN]);
    }
    setCnt((prev) => prev + 8);
  };
  useEffect(() => {
    setTopicRandom();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={topic}
        renderItem={({ item }) => (<TopicBox topic={item}/>)}
      />
      <TouchableOpacity onPress={() => setTopicRandom()}>
        <Text>Flush</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
});

export default ConversationList;
