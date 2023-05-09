import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ElevenlabsContext } from '../ConversationList';

type topic = string;

// type setTopic = React.Dispatch<React.SetStateAction<topic>>;

type TopicBoxProps = {
  topic: topic;
  // setTopic: setTopic;
};

const TopicBox:React.FC<TopicBoxProps> = ({topic}) => {
    const  isElevenlabsEffective  = useContext(ElevenlabsContext);
    const navigate = useNavigation();
    const handlePress = () => {
      navigate.navigate('AI_conversation', {topic: topic, isElevenlabsEffective})
    };
    const colors = [
        '#0099FF',
        '#8EB8FF',
        '#C299FF'
    ];
    const backgroundColor = colors[0]

    return (
        <Animatable.View
            animation="pulse"
            duration={400}
            iterationCount={1}
            style={[styles.card, {backgroundColor}]}
            useNativeDriver
        >
        <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
            <Text style={styles.cardText}>{topic}</Text>
        </TouchableOpacity>
        </Animatable.View>
    );
};
export default TopicBox;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

