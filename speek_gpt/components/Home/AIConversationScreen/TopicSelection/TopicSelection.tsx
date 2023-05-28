import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Switch, ActionSheetIOS } from 'react-native';
import TopicBox from './TopicBox';
import data from './prompt.json';
import { Iconify } from 'react-native-iconify';
import PurchaseModalView from '../../../Subscription/PurchaseModalView';
import { ModalVisibleContext } from '../../../../App';
import { useSelector } from 'react-redux';
import { tokenlimit, User } from '../../../Subscription/Plan.type';
import { ModalVisibleContextProps } from '../../../../App';
// import { Iconify } from 'react-native-iconify';
// import TextInputArea from './TextInputArea';
// import  LinearGradient  from 'react-native-linear-gradient';

export const ElevenlabsContext = createContext<boolean>(false);

const ConversationList: React.FC = () => {
  const user: User = useSelector((state: any) => state.user);
  // const plan = useSelector((state: any) => state.plan);
  const [topic, setTopic] = useState<string[]>([]);
  const [isElevenlabsEffective, setIsElevenlabsEffective] = useState<boolean>(false);
  const [cnt, setCnt] = useState<number>(0);
  const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);

  useEffect(() => {
    const ElevenlabsDetails = () => {
      // console.log('user: ', user.eleventoken);
      if (user.eleventoken > tokenlimit[user.plan].eleventoken) {
        // console.log('eleventoken: ', user.eleventoken);
        // console.log('tokenlimit: ', tokenlimit[user.plan].eleventoken);
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['キャンセル'],
            cancelButtonIndex: 0,
            title: '使用上限に到達しました。',
            message: 'さらにネイティブ読み上げ機能を使いたい場合、Premiumプランへのご登録をお願いいたします。'
          },
          (buttonIndex) => {
            if (buttonIndex === 0) setIsElevenlabsEffective(false);
          }
        );
      }
    };
    if (isElevenlabsEffective) ElevenlabsDetails();
  }, [isElevenlabsEffective]);

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
    setIsElevenlabsEffective(false);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>トピックを決めて会話を始めよう！</Text>
      <TouchableOpacity style={styles.button} onPress={() => setTopicRandom()}>
        <Text style={styles.buttonText}>NEXT TOPIC</Text>
      </TouchableOpacity>
      <ElevenlabsContext.Provider value={isElevenlabsEffective}>
        <FlatList
          style={{ padding: 10 }}
          data={topic}
          renderItem={({ item, index }) => (<TopicBox topic={item} delay={index}/>)}
        />
      </ElevenlabsContext.Provider>
      <View style={styles.elevenfuncContainer}>
        <View style={styles.switchcontainer}>
          <Text>ネイティブ読み上げ機能を使う</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isElevenlabsEffective ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsElevenlabsEffective(!isElevenlabsEffective)}
            value={isElevenlabsEffective}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Iconify icon={"solar:question-circle-linear"} size={20} color={'#0099FF'} />
        </TouchableOpacity>
      </View>
      {/* <ModalVisibleContext.Provider value={{modalVisible,setModalVisible}}> */}
      <PurchaseModalView />
      {/* </ModalVisibleContext.Provider> */}
    </View>
    // {/* <TextInputArea></TextInputArea> */}
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  switchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 10,
  },
  elevenfuncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  }
});

export default ConversationList;
