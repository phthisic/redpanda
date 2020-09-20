import React, {Component} from 'react';
import {Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import login from '../pages/login'
// import schedule from '../pages/schedule'
import MainTabNavigator from './TapNav';

const LoginNavigation = createStackNavigator({
    Login: login,
    Home:{
        screen:MainTabNavigator
    }
},{
    initialRouteName:'Login'
});

const AppContainer = createAppContainer(LoginNavigation);

export default AppContainer;
