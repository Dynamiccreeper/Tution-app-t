import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { AppTabNavigator } from './bottomTabNavigator';
import Profile from '../screens/Profile'

import Settings from '../screens/Settings';
export const SettingsStackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: { headerShown: false },
    },
    Profile: {
      screen: Profile,
      navigationOptions: { headerShown: false },
    },
  },

  {
    initialRouteName: 'Settings',
  }
);
