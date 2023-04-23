import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import Verify from './Verify';
import AI_conversation from './AI_conversation';
import SignIn from './SignIn';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="AI_conversation" component={AI_conversation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
