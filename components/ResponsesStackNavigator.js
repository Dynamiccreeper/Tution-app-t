import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { AppTabNavigator } from './bottomTabNavigator';
import Responces from '../screens/Responces';
import ResponcesDetail from '../screens/ResponcesDetail';

export const ResponsesStackNavigator = createStackNavigator(
  {
    Responces: {
      screen: Responces,
      navigationOptions: { headerShown: false },
    },
    ResponcesDetail: {
      screen: ResponcesDetail,
      navigationOptions: { headerShown: false },
    },
  },

  {
    initialRouteName: 'Responces',
  }
);
