import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Switch, ActionSheetIOS, Modal } from 'react-native';
import TopicBox from './home/TopicBox';
import data from '../prompt.json';
import { Iconify } from 'react-native-iconify';
import PurchaseModalView from './home/PurchaseModalView';
import { ModalVisibleContext } from '../../App';
// import { Iconify } from 'react-native-iconify';
// import TextInputArea from './TextInputArea';
// import  LinearGradient  from 'react-native-linear-gradient';

type ModalVisibleContextProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ElevenlabsContext = createContext<boolean>(false);

const ConversationList: React.FC = () => {
  const [topic, setTopic] = useState<string[]>([]);
  const [isElevenlabsEffective, setIsElevenlabsEffective] = useState<boolean>(false);
  const [cnt, setCnt] = useState<number>(0);
  const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
  const ElevenlabsDetails = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', 'ネイティブ読み上げ機能を使う', 'ネイティブ読み上げ機能を使わない'],
        cancelButtonIndex: 0,
        title: 'ネイティブ読み上げ機能について',
        message: 'ネイティブ読み上げ機能を使うと、より自然な音声で文章を読み上げます。あなたがプレミアムプランでない場合は1000トークンまでに使用が制限されます。'
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          setIsElevenlabsEffective(true);
        } else if (buttonIndex === 2) {
          setIsElevenlabsEffective(false);
        }
      }
    );
  };
  useEffect(() => {
    console.log('modalVisible: ', modalVisible);
    }, [modalVisible]);

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
      <PurchaseModalView/>
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
