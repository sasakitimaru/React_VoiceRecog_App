import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text ,ActionSheetIOS} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ElevenlabsContext } from './TopicSelection';
import { useSelector } from 'react-redux';
import { ModalVisibleContext } from '../../../../App';
import { User, tokenlimit } from '../../../Subscription/Plan.type';

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TopicBoxProps = {
  topic: string;
};

const TopicBox: React.FC<TopicBoxProps> = ({ topic }) => {
  const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
  const user: User = useSelector((state: any) => state.user);
  const isElevenlabsEffective = useContext(ElevenlabsContext);
  const navigate = useNavigation();
  const handlePress = () => {
    const user_token = isElevenlabsEffective ? user.eleventoken : user.token
    const limit_token = isElevenlabsEffective ? tokenlimit[user.plan].eleventoken : tokenlimit[user.plan].token
    if(user_token < limit_token){
      navigate.navigate('AI_conversation', { topic: topic, isElevenlabsEffective })
    }else{
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['戻る'],
          cancelButtonIndex: 0,
          title: `${isElevenlabsEffective ? 'ネイティブトークンの' : 'スタンダードトークンの'}使用上限に到達しました。`,
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

