import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import { TitleAndComment, CreateForm} from './source/index';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
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
      {/* <TextInput onChangeText={setDesiredPageName} style={styles.input} placeholder="Page Name" /> */}
      <Picker selectedValue={desiredPageName}
        onValueChange={(itemValue) => setDesiredPageName(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a Page" value="" />
        <Picker.Item label="SignUp" value="SignUp" />
        <Picker.Item label="SignIn" value="SignIn" />
        <Picker.Item label="Verify" value="Verify" />
        <Picker.Item label="AI_conversation" value="AI_conversation" />
      </Picker>
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