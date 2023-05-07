import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './source/SignUp';
import Verify from './source/Verify';
import SignIn from './source/SignIn';
import Home from './source/Home';
import ChatHistory from './source/components/History/ChatHistory';
import AI_conversation from './source/components/AI_conversation';
// import History from './source/components/History';
import History from './source/components/History';



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
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name="ChatHistory" component={ChatHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
