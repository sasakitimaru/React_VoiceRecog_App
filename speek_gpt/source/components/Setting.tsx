import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActionSheetIOS } from 'react-native';
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
    }
  };

  const handleActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', 'ログアウトする'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          handleSignOut();
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
          onPress={handleActionSheet}>
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