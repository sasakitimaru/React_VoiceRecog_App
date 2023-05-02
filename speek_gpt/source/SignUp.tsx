import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { TitleAndComment, CreateForm} from './components';
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
      <TouchableOpacity style={styles.input} onPress={() => moveTodesignatedPage(desiredPageName)}>
        <Text style={styles.submitText}>For debug: Move to designated page</Text>
      </TouchableOpacity>
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