import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import TopicBox from './home/TopicBox';
import data from '../prompt.json';
// import  LinearGradient  from 'react-native-linear-gradient';

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
        style={{ padding: 10 }}
        data={topic}
        renderItem={({ item }) => (<TopicBox topic={item}/>)}
      />
      <TouchableOpacity style={styles.button} onPress={() => setTopicRandom()}>
        <Text style={styles.buttonText}>Flush</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    width: '50%',
    padding: 10,
    backgroundColor: '#8EB8FF',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: '20%',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default ConversationList;
