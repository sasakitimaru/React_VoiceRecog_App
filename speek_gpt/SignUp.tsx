import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import { TitleAndComment, CreateForm} from './source/index';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
  const navigation = useNavigation();// for debug
  const [desiredPageName, setDesiredPageName] = useState<String>('');// for debug
  const moveTodesignatedPage = (text: String) => {
    // for debug
    navigation.navigate(text);
  };


  return (
    <View style={styles.container}>
      <TitleAndComment />
      <CreateForm />
      {/* for debug from here*/}
      <TextInput onChangeText={setDesiredPageName} style={styles.input} placeholder="Page Name" />
      <TouchableOpacity style={styles.input} onPress={() => moveTodesignatedPage(desiredPageName)}>
        <Text style={styles.submitText}>For debug: Move to designated page</Text>
      </TouchableOpacity>
      {/* for debug to here*/}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});