import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import { AppTabNavigator } from './components/bottomTabNavigator.js';
import SignUpScreen from './screens/Signup';
import SplashScreen from './screens/splashScreen';

export default function App() {
  return <AppContainer />;
}
//8.2.3
const switchNavigator = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignUpScreen },
  Tabs: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
