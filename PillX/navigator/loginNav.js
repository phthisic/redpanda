import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import welcome from '../pages/loginModule/welcome';
import signup from '../pages/loginModule/signup';
import getPassword from '../pages/loginModule/getPassword';
import setting from '../pages/settingModule/settingpage';

// page stack for login module
const LoginNavigation = createStackNavigator(
  {
    welcome: {
      screen: welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    signup: {
      screen: signup,
      navigationOptions: {
        title: ' ',
      },
    },
    getPassword: {
      screen: getPassword,
      navigationOptions: {
        title: ' ',
      },
    },
  },
  {
    initialRouteName: 'welcome',
  },
);

export default LoginNavigation;
