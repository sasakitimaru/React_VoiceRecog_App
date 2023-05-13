import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';

type ProfileListItem = {
  key: string;
  component: JSX.Element;
};
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
  const handleInquiryForm = () => {
    navigation.navigate('InquiryForm');
  };
  const handlePlan = () => {
    navigation.navigate('ConfirmPlan');
  };
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigation.dispatch(CommonActions.navigate('SignIn'));
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const profileListItems: ProfileListItem[] = [
    {
      key: 'email', component:
        <TouchableOpacity style={styles.listItemcontainer}>
          <Text>Email : {username}</Text>
          <Iconify icon='ic:sharp-keyboard-arrow-right' size={30} color='#000000' />
        </TouchableOpacity>
    },
    {
      key: 'plan', component:
        <TouchableOpacity 
          onPress={handlePlan}
          style={styles.listItemcontainer}>
          <Text>プラン</Text>
          <Iconify icon='ic:sharp-keyboard-arrow-right' size={30} color='#000000' />
        </TouchableOpacity>
    },
    {
      key: 'inquiryForm', component:
        <TouchableOpacity 
          style={styles.listItemcontainer}
          onPress={handleInquiryForm}  
        >
          <Text>お問い合わせ</Text>
          <Iconify icon='ic:sharp-keyboard-arrow-right' size={30} color='#000000' />
        </TouchableOpacity>
    },
    {
      key: 'signOut', component:
        <TouchableOpacity
          style={styles.listItemcontainer}
          onPress={handleSignOut}>
          <Text>ログアウト</Text>
          <Iconify icon='ic:sharp-keyboard-arrow-right' size={30} color='#000000' />
        </TouchableOpacity>
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={profileListItems}
        renderItem={({ item }) => (
          <View style={styles.listItem}>{item.component}</View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});