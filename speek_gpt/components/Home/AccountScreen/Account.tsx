import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActionSheetIOS, Alert, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const email = useSelector((state: any) => state.user.email);
  const handleInquiryForm = () => {
    navigation.navigate('InquiryForm');
  };
  const handlePlan = () => {
    navigation.navigate('ConfirmPlan');
  };
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await Auth.signOut();
      setIsLoading(false);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('ログアウトに失敗しました');
      setIsLoading(false);
    }
  };
  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      // const user = await Auth.currentAuthenticatedUser();
      // await Auth.deleteUser(user);
      await Auth.deleteUser();
      setIsLoading(false);
      Alert.alert('アカウントを削除しました');
      navigation.navigate('SignUp')
      console.log('User account deleted');

    } catch (error) {
      console.error('Error deleting user account', error);
      //alart出す
      setIsLoading(false);
      Alert.alert('アカウントの削除に失敗しました');
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
          if (description === 'ログアウトする') handleSignOut();
          else if (description === 'アカウントを削除する') handleDeleteUser();
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
    <>
      {isLoading &&
        <View style={styles.indicatorcontainer}>
          <ActivityIndicator animating={isLoading} size='large' />
        </View>}
      <View style={styles.container}>
        <FlatList
          data={profileListItems}
          renderItem={({ item }) => (
            <View style={styles.listItem}>{item.component}</View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  indicatorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
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