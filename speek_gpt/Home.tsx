import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UnderMenuBar } from './source';
import AI_conversation from './source/AI_conversation';
import History from './source/History';
import Setting from './source/Setting';
import ConversationList from './source/ConversationList';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [PageName, setPageName] = useState<String>('');
  const [topic, setTopic] = useState<String>('');
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<AI_conversation setTopic={setTopic}/>);
  const navigate = useNavigation();
  useEffect(() => {
    navigate.setOptions({
      headerShown: true,
      headerLeft: null,
    });
  }, []);

  useEffect(() => {
    console.log('current topic: ',topic)
    switch (PageName) {
      case 'Home':
        if (topic !== '') setCurrentComponent(<AI_conversation setTopic={setTopic}/>);
        else setCurrentComponent(<ConversationList setTopic={setTopic}/>);
        break;
      case 'History': 
        setCurrentComponent(<History />);
        break;
      case 'Setting':
        setCurrentComponent(<Setting />);
        break;
      default:
        setCurrentComponent(<ConversationList setTopic={setTopic}/>);
    }
  }, [PageName]);
  useEffect(() => {
    if (topic !== '') setCurrentComponent(<AI_conversation setTopic={setTopic}/>);
    else setCurrentComponent(<ConversationList setTopic={setTopic}/>);
  }, [topic]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.contentView}>
        {currentComponent}
      </View>
      <View style={styles.bottomView}>
        <UnderMenuBar setTopic={setTopic} setPageName={setPageName}></UnderMenuBar>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    flex: 1,
    width: '100%',
    height: '80%',
    paddingBottom: '20%',
  },
  bottomView: {
    width: '100%',
    height: '10%',
    backgroundColor: '#DCDCDC',
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, 
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});