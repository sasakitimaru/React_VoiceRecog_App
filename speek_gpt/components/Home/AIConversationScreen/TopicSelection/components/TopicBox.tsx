import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActionSheetIOS } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ElevenlabsContext } from '../TopicSelection';
import { useSelector } from 'react-redux';
import { ModalVisibleContext } from '../../../../../App';
import { User, tokenlimit } from '../../../../Subscription/Plan.type';

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TopicBoxProps = {
  topic: string;
  delay: number;
  isTopicFlushed: boolean;
};

const TopicBox: React.FC<TopicBoxProps> = ({ topic, delay, isTopicFlushed }) => {
  const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
  const user: User = useSelector((state: any) => state.user);
  const isElevenlabsEffective = useContext(ElevenlabsContext);
  const navigate = useNavigation();
  // const animation = "slideInRight"
  const duration = 500
  const animeRef = useRef<any>(null);
  const handlePress = () => {
    const user_token = isElevenlabsEffective ? user.eleventoken : user.token
    const limit_token = isElevenlabsEffective ? tokenlimit[user.plan].eleventoken : tokenlimit[user.plan].token
    if (user_token < limit_token) {
      navigate.navigate('AI_conversation', { topic: topic, isElevenlabsEffective })
    } else {
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

  useEffect(() => {
    if (!isTopicFlushed) {
      if (animeRef.current) {
        // animeRef.current.animate(animation, duration)
        animeRef.current.transition(
          { translateX: 500 }, // 開始状態（画面の右外側）
          { translateX: 0 },   // 終了状態（画面の中央）
          duration,                 // アニメーションの時間
          'ease-in-out',        // イージング
        )
      }
    }
  }, [isTopicFlushed]);

  useEffect(() => {
    if (isTopicFlushed) {
      animeRef.current.transition(
        { translateX: 0 },
        { translateX: -500 },
        duration,
        'ease-in-out',
      )
    }
  }, [isTopicFlushed]);

  const colors = [
    '#0099FF',
    '#8EB8FF',
    '#C299FF'
  ];
  const backgroundColor = colors[0]

  return (
    <Animatable.View
      // animation={animation}
      // duration={duration}
      ref={animeRef}
      delay={delay * 100}
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
    width: '100%',
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

