import React, { useState, useEffect , useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { UnderMenuBar } from './components';
import Setting from './components/Setting';
import ConversationList from './components/ConversationList';
import { useNavigation } from '@react-navigation/native';
import Test from './Test/testfield';
import Calendar from './components/Calendar';
import fetchUser from './components/History/FetchUser';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStateAction } from './redux/user/useractions';

const Home: React.FC = () => {
  const [PageName, setPageName] = useState<String>('Home');
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<ConversationList />);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const selecter = useSelector((state: any) => state);
  useEffect(() => {
    fetchUser().then((user) => {
      const { plan, usedTokens, usedElevenTokens } = user;
      console.log('user: ', user.usedTokens)
      dispatch(initializeStateAction( usedTokens, usedElevenTokens, plan));
      console.log('selecter: ', selecter)
    });
    navigate.setOptions({
      headerShown: true,
      headerLeft: null,
    });
  }, []);

  useEffect(() => {
    // dispatch(plusTokenAction(selecter.user.token + 50));
    // dispatch(changePlanAction('プレミアム'));
    // console.log('selecter: ', selecter);
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
        <SafeAreaView>
          <UnderMenuBar setPageName={setPageName}></UnderMenuBar>
        </SafeAreaView>
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
    height: '11%',
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