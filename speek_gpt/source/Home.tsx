import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UnderMenuBar } from './components';
import Setting from './components/Setting';
import ConversationList from './components/ConversationList';
import { useNavigation } from '@react-navigation/native';
import Test from './Test/testfield';
import Calendar from './components/Calendar';

const Home:React.FC = () => {
  const [PageName, setPageName] = useState<String>('Home');
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<ConversationList/>);
  const navigate = useNavigation();
  useEffect(() => {
    navigate.setOptions({
      headerShown: true,
      headerLeft: null,
    });
  }, []);

  useEffect(() => {
    console.log('current PageName: ',PageName)
    switch (PageName) {
      case 'Home':
        setCurrentComponent(<ConversationList />);
        break;
      case 'History': 
        setCurrentComponent(<Calendar />);
        break;
      case 'Setting':
        setCurrentComponent(<Setting />);
        break;
      case 'test':
        setCurrentComponent(<Test />);
      // default:
      //   setCurrentComponent(<ConversationList setTopic={setTopic}/>);
    }
  }, [PageName]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.contentView}>
        {currentComponent}
      </View>
      <View style={styles.bottomView}>
        <UnderMenuBar setPageName={setPageName}></UnderMenuBar>
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
    paddingBottom: '18%',
  },
  bottomView: {
    width: '100%',
    height: '10%',
    backgroundColor: '#DCDCDC',
    // borderTopColor: 'black',
    // borderTopWidth: 1.0,
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