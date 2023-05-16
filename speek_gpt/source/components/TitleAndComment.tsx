import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
// import Navigation from '../Navigation';
import { useNavigation } from '@react-navigation/native';

const TitleAndComment:React.FC = () => {
  const navigation = useNavigation();
  const MoveToLogin = () => {
    try {
      navigation.navigate('SignIn');
    }catch(error){
      console.log('this page currently does not work')
    }
  }

  return (
    <View style={styles.createAccountWrapper}>
      <Text style={styles.createAccountLogo}>Sign up a new account</Text>
      <Text style={styles.createAccountDesc}>
        すでにアカウントを持っている方
      </Text>
      <TouchableOpacity onPress={MoveToLogin}>
          <Text style={{color: 'blue'}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  createAccountWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  createAccountDesc: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default TitleAndComment;
