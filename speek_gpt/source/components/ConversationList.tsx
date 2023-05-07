import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import TopicBox from './home/TopicBox';
import data from '../prompt.json';
import { Iconify } from 'react-native-iconify';
// import TextInputArea from './TextInputArea';
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
    <>
    <View style={styles.container}>
      <Text style={styles.titleText}>トピックを決めて会話を始めよう！</Text>
      <TouchableOpacity style={styles.button} onPress={() => setTopicRandom()}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
      <FlatList
        style={{ padding: 10 }}
        data={topic}
        renderItem={({ item }) => (<TopicBox topic={item}/>)}
      />
    </View>
    {/* <TextInputArea></TextInputArea> */}
    </>
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
    // width: '50%',
    padding: 10,
    backgroundColor: '#8EB8FF',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: '5%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
});

export default ConversationList;
