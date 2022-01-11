import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { AppTabNavigator } from './bottomTabNavigator';
import AddStudentScreen from '../screens/AddStudentScreen';
import StudentListScreen from '../screens/StudentListScreen';
import Assignment from '../screens/Assignment'
import Create from '../screens/Create'


export const StudentStackNavigator = createStackNavigator(
  {
    StudentListScreen: {
      screen: StudentListScreen,
      navigationOptions: { headerShown: false },
    },
    AddStudentScreen: {
      screen: AddStudentScreen,
      navigationOptions: { headerShown: false },
    }
  
   
  },
  {
    initialRouteName: 'StudentListScreen',
  }
);
