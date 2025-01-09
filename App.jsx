/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNavigation from './src/layouts/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenEnum from './src/constants/screenEnum';
import LoginScreen from './src/screens/auth/LoginScreen';
import OrderHistoryScreen from './src/screens/order/OrderHistoryScreen';
import CheckoutScreen from './src/screens/order/CheckoutScreen';



const BaseStack = createNativeStackNavigator()
function App() {
  return (


    <NavigationContainer>


      <BaseStack.Navigator
        screenOptions={{ headerShown: false }}>

        <BaseStack.Screen name={ScreenEnum.MainNavigation} component={MainNavigation} />

        <BaseStack.Screen name={ScreenEnum.LoginScreen} component={LoginScreen} />

        <BaseStack.Screen name={ScreenEnum.OrderHistoryScreen} component={OrderHistoryScreen} />

        <BaseStack.Screen name={ScreenEnum.CheckoutScreen} component={CheckoutScreen} />



      </BaseStack.Navigator>


    </NavigationContainer>


  );
}


export default App;