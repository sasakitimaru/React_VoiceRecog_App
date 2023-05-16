import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text ,ActionSheetIOS} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ElevenlabsContext } from '../ConversationList';
import { useSelector } from 'react-redux';
import { ModalVisibleContext } from '../../../App';

type topic = string;

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TopicBoxProps = {
  topic: topic;
  // setTopic: setTopic;
};

type Plan = 'nomal' | 'standard' | 'premium' | 'special';

type User = {
  plan: Plan;
  token: number;
  eleventoken: number;
};

type Tokenlimit = {
  [P in Plan]: {
    token: number;
    eleventoken: number;
  };
};

const TopicBox: React.FC<TopicBoxProps> = ({ topic }) => {
  const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
  const user: User = useSelector((state: any) => state.user);
  const tokenlimit: Tokenlimit = {
    nomal: {
      token: 1000,
      eleventoken: 1000,
    },
    standard: {
      token: 30000,
      eleventoken: 1000,
    },
    premium: {
      token: 50000,
      eleventoken: 30000,
    },
    special: {
      token: 9999999,
      eleventoken: 9999999,
    }
  };
  const isElevenlabsEffective = useContext(ElevenlabsContext);
  const navigate = useNavigation();
  const handlePress = () => {
    if(user.token < tokenlimit[user.plan].token){
      navigate.navigate('AI_conversation', { topic: topic, isElevenlabsEffective })
    }else{
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['キャンセル'],
          cancelButtonIndex: 0,
          title: '使用上限に到達しました。',
          message: 'StandardプランかPremiumプランへのご登録をお願いいたします。'
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            setModalVisible(!modalVisible);
          }
        }
      );
    }
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
      style={[styles.card, { backgroundColor }]}
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

