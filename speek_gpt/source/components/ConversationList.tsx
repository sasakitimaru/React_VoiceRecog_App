import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopicBox from './home/TopicBox';

type ConversationListProps = {
    setTopic: (topic: String) => void;
};
const ConversationList:React.FC<ConversationListProps> = ({setTopic}) => {
    return (
        <View style={styles.container}>
        <TopicBox tmpTopic='How was your day?' setTopic={setTopic}/>
        <TopicBox tmpTopic='Did something interesting happen?' setTopic={setTopic}/>
        <TopicBox tmpTopic='Let me know what the best thing happened.' setTopic={setTopic}/>
        {/* More TopicBox components */}
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
