import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import inputHealthData from '../pages/inputHealthData';
import healthdata from '../pages/healthdata';

// page stack for the health data module
const HealthDataNavigation = createStackNavigator(
  {
    healthdata: {
      screen: healthdata,
      navigationOptions: {
        title: 'Health Data',
        headerShown: false,
      },
    },
    inputHealthData: {
      screen: inputHealthData,
      navigationOptions: {
        title: 'Create a New Record',
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'healthdata',
    navigationOptions: ({navigation}) => ({
      // hide tabbar for secondary page
      tabBarVisible: navigation.state.index === 0,
    }),
  },
);

export default HealthDataNavigation;
