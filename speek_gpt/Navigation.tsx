import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import Verify from './Verify';
import SignIn from './SignIn';
import Home from './Home';
import ChatHistory from './source/History/ChatHistory';
import AI_conversation from './source/AI_conversation';



type NavigationProps = {IsAuthenticated: boolean};

const Stack = createStackNavigator();
const Navigation:React.FC<NavigationProps> = ({IsAuthenticated}) => {
  console.log('IsAuthenticated: ',IsAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={IsAuthenticated ? 'Home' : 'SignUp'}
        screenOptions={{headerShown: false, gestureEnabled: false}}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="AI_conversation" component={AI_conversation} />
        <Stack.Screen name="ChatHistory" component={ChatHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
