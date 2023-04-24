import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState<String>('');
    useEffect(() => {
      fetchUserData()
    }, []);
    const fetchUserData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user.username);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
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
      <Text>email:{username}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
