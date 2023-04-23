import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation();
    const handleSignOut = async () => {
    try {
        await Auth.signOut();
        navigation.dispatch(CommonActions.navigate('SignIn'));
    } catch (error) {
        console.error('Error signing out: ', error);
    }
  };

  return (
    <View>
      <Text>Comming soon</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
