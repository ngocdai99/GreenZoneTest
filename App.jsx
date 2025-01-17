/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppGraph, AuthGraph, MainGraph, OrderGraph, ShoppingGraph, UserGraph } from './src/layouts/graphs';
import MainNavigation from './src/layouts/MainNavigation';
import LoginScreen from './src/screens/auth/LoginScreen';
import CheckoutScreen from './src/screens/order/CheckoutScreen';
import OrderDetailScreen from './src/screens/order/OrderDetailScreen';
import OrderHistoryScreen from './src/screens/order/OrderHistoryScreen';
import MembershipCard from './src/screens/member-ship/MemberShipCard';
import ProfileScreen from './src/screens/bottom-navs/ProfileScreen';
import NotificationScreen from './src/screens/notification/NotificationScreen';


const BaseStack = createNativeStackNavigator();
function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BaseStack.Navigator screenOptions={{ headerShown: false }}>

          <BaseStack.Screen name={MainGraph.graphName} component={MainNavigation} />

          <BaseStack.Screen name={AuthGraph.LoginScreen} component={LoginScreen} />

          <BaseStack.Screen name={OrderGraph.OrderHistoryScreen} component={OrderHistoryScreen} />

          <BaseStack.Screen name={ShoppingGraph.CheckoutScreen} component={CheckoutScreen} />
          <BaseStack.Screen name={OrderGraph.OrderDetailScreen} component={OrderDetailScreen} />
          <BaseStack.Screen name={UserGraph.Notification} component={NotificationScreen} />


          <BaseStack.Screen
            name={AppGraph.MembershipCard}
            component={MembershipCard}
          />


        </BaseStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
