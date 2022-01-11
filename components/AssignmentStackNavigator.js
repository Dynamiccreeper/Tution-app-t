import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { AppTabNavigator } from './bottomTabNavigator';
import Assignment from '../screens/Assignment'
import Create from '../screens/Create'
import AssignmentDetails from '../screens/AssignmentDetail'
import Responces from '../screens/Responces'
import ResponcesDetail from '../screens/ResponcesDetail'

export const AssignmentStackNavigator = createStackNavigator(
  {
   
    Assignment: {
      screen: Assignment,
      navigationOptions: { headerShown: false },
    },
    Create: {
      screen: Create,
      navigationOptions: { headerShown: false },
    },
    AssignmentDetails: {
      screen: AssignmentDetails,
      navigationOptions: { headerShown: false },
    },
  },

  {
    initialRouteName: 'Assignment',
  }
);
