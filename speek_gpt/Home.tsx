import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UnderMenuBar } from './source';
import AI_conversation from './source/AI_conversation';
import History from './source/History';
import Setting from './source/Setting';

const Home = () => {
  const [PageName, setPageName] = useState<String>('');
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<AI_conversation />);

  useEffect(() => {
    console.log('PageName: ',PageName)
    switch (PageName) {
      case 'Home':
        setCurrentComponent(<AI_conversation />);
        break;
      case 'History': 
        setCurrentComponent(<History />);
        break;
      case 'Setting':
        setCurrentComponent(<Setting />);
        break;
      default:
        setCurrentComponent(<AI_conversation />);
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
    paddingBottom: '16%',
  },
  bottomView: {
    width: '100%',
    height: '8%',
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