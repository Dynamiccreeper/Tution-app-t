import * as React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { StudentStackNavigator } from './StudentStackNavigator';
import { AssignmentStackNavigator } from './AssignmentStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';
import { ResponsesStackNavigator } from './ResponsesStackNavigator';

import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';

export const AppTabNavigator = createBottomTabNavigator({
  Assignments: {
    screen: AssignmentStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="list" size={25} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#0092D8',
        inactiveTintColor: 'gray',
      },
      tabBarLabel: 'Assignments',
    },
  },
  Responses: {
    screen: ResponsesStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="book-open" size={24} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#0092D8',
        inactiveTintColor: 'gray',
      },
      tabBarLabel: '',
    },
  },
  List: {
    screen: StudentStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="people" size={25} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#0092D8',
        inactiveTintColor: 'gray',
      },
      tabBarLabel: 'Students',
    },
  },
  Settings: {
    screen: SettingsStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="settings" size={24} color={tintColor} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#0092D8',
        inactiveTintColor: 'gray',
      },
      tabBarLabel: '',
    },
  },
});
