import React, { useState, useEffect, createContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Switch } from 'react-native';
import TopicBox from './home/TopicBox';
import data from '../prompt.json';
import { isEmpty } from '@aws-amplify/core';
// import { Iconify } from 'react-native-iconify';
// import TextInputArea from './TextInputArea';
// import  LinearGradient  from 'react-native-linear-gradient';
export const ElevenlabsContext = createContext<boolean>(false);
const ConversationList: React.FC = () => {
  const [topic, setTopic] = useState<string[]>([]);
  const [isElevenlabsEffective, setIsElevenlabsEffective] = useState<boolean>(false);
  const [cnt, setCnt] = useState<number>(0);
  const setTopicRandom = () => {
    setTopic([]);
    for (let i = 0; i < 8; i++) {
      // let tmp = Math.floor(Math.random() * data.length);
      setTopic((prev) => [...prev, data[(cnt + i) % 100].topic_JP]);
    }
    setCnt((prev) => prev + 8);
  };
  useEffect(() => {
    setTopicRandom();
  }, []);
  return (
      <View style={styles.container}>
        <Text style={styles.titleText}>トピックを決めて会話を始めよう！</Text>
        <TouchableOpacity style={styles.button} onPress={() => setTopicRandom()}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
        <ElevenlabsContext.Provider value={isElevenlabsEffective}>
        <FlatList
          style={{ padding: 10 }}
          data={topic}
          renderItem={({ item }) => (<TopicBox topic={item} />)}
        />
        </ElevenlabsContext.Provider>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isElevenlabsEffective ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsElevenlabsEffective(!isElevenlabsEffective)}
          value={isElevenlabsEffective}
        />
      </View>
      // {/* <TextInputArea></TextInputArea> */}
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderColor: '#0099FF',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: '5%',
  },
  buttonText: {
    color: '#0099FF',
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
