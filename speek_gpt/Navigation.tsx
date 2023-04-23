import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import Verify from './Verify';
import SignIn from './SignIn';
import Home from './Home';

type NavigationProps = {IsAuthenticated: boolean};

const Stack = createStackNavigator();
const Navigation:React.FC<NavigationProps> = ({IsAuthenticated}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
      {IsAuthenticated ? (
        // ログイン済みの場合
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        // ログインしていない場合
        <>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
