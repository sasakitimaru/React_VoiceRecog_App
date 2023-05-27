import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActionSheetIOS, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';
import { useSelector } from 'react-redux';

type ProfileListItem = {
  key: string;
  component: JSX.Element;
};
const Setting = () => {
  const navigation = useNavigation();
  const email = useSelector((state: any) => state.user.email);
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
      Alert.alert('ログアウトに失敗しました');
    }
  };
  const handleDeleteUser = async () => {
    try {
      // const user = await Auth.currentAuthenticatedUser();
      // await Auth.deleteUser(user);
      await Auth.deleteUser();
      Alert.alert('アカウントを削除しました');
      navigation.navigate('SignUp')
      console.log('User account deleted');
      
    } catch (error) {
      console.error('Error deleting user account', error);
      //alart出す
    }
  }
  const handleActionSheet = (description: string) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', description],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          if(description === 'ログアウトする') handleSignOut();
          else if(description === 'アカウントを削除する') handleDeleteUser();
        }
      },
    );
  };

  const profileListItems: ProfileListItem[] = [
    {
      key: 'email', component:
        <TouchableOpacity style={styles.listItemcontainer}>
          <Text>Email : {email}</Text>
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
          onPress={() => handleActionSheet('ログアウトする')}>
          <Text>ログアウト</Text>
          <Iconify icon='ic:sharp-keyboard-arrow-right' size={30} color='#000000' />
        </TouchableOpacity>
    },
    {
      key: 'deleteAccount', component:
        <TouchableOpacity
          style={styles.listItemcontainer}
          onPress={() => handleActionSheet('アカウントを削除する')}>
          <Text>アカウント削除</Text>
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