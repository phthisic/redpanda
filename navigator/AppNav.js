import React, {Component} from 'react';
import {Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import welcome from '../loginModule/welcome'
// import schedule from '../pages/schedule'
import MainTabNavigator from './TapNav';
import LoginContainer from '../loginModule/loginNav'

const AppNavigation = createStackNavigator({
    welcome:{
        screen: welcome,
        navigationOptions:{
            headerShown: false,
        }
    },
    Home:{
        screen:MainTabNavigator
    },
    login:{
        screen:LoginContainer,
        navigationOptions:{
            // title:"Create a new account",
            headerShown: false,
        }
    }
},{
    initialRouteName:'welcome'
});

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
