import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


type TopicBoxProps = {
    tmpTopic: String;
    setTopic: (topic: String) => void;
};
const TopicBox:React.FC<TopicBoxProps> = ({tmpTopic,setTopic}) => {
    const navigate = useNavigation();
    const handlePress = () => {
      navigate.navigate('AI_conversation')
      console.log('tmpTopic: ',tmpTopic);
    };
    const colors = [
        '#8EF1FF',
        '#8EB8FF',
        '#C299FF'
    ];
    const backgroundColor = colors[1]

    return (
        <Animatable.View
            animation="pulse"
            duration={400}
            iterationCount={1}
            style={[styles.card, {backgroundColor}]}
            useNativeDriver
        >
        <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
            <Text style={styles.cardText}>{tmpTopic}</Text>
        </TouchableOpacity>
        </Animatable.View>
    );
};
export default TopicBox;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
});

