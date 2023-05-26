import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const EnrollForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [warningText, setWarningText] = useState(null);


  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const user = await Auth.signIn(email, password);
      // console.log('email:', user.email, '\npassword:', user.password);
      // console.log('user:', user);
      navigation.navigate('Home');
    } catch (error: any) {
      console.log('error signing in', error);
      setWarningText(error.message);
      if(error.message === 'User is not confirmed.') navigation.navigate('Verify', { username: email });
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email-address"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.submit} onPress={handleLogin} disabled={isLoggingIn}>
          <Text style={styles.submitText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.createAccountContainer}>
          <Text>新しいアカウントを作る </Text>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {(warningText !== null) && (
          <Text style={styles.createAccountWarning}>{warningText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  submit: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountWarning: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  createAccountText: {
    color: '#007BFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
},
});

export default EnrollForm;
