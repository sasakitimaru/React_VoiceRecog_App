import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './components/Signature/SignUp';
import Verify from './components/Signature/Verify';
import SignIn from './components/Signature/SignIn';
import Home from './components/Home/Home';
import ChatHistory from './components/Home/LearnHistoryScreen/History/ChatHistory';
import AI_conversation from './components/Home/AIConversationScreen/AIConversation/AI_conversation';
import History from './components/Home/LearnHistoryScreen/History/HistoryListPerDay';
import InquiryForm from './components/Home/AccountScreen/components/InquiryForm';
import ConfirmPlan from './components/Home/AccountScreen/components/ConfirmPlan/ConfirmPlan';

type NavigationProps = { IsAuthenticated: boolean };

const Stack = createStackNavigator();
const Navigation: React.FC<NavigationProps> = ({ IsAuthenticated }) => {
  const [isRestoring, setIsRestoring] = useState<boolean>(false);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={IsAuthenticated ? 'Home' : 'SignUp'}
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AI_conversation" component={AI_conversation} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name="ChatHistory" component={ChatHistory} />
        <Stack.Screen name="InquiryForm" component={InquiryForm} />
        <Stack.Screen name="ConfirmPlan" component={ConfirmPlan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
