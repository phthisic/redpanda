import React, {Component} from 'react';
import {Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import welcome from '../loginModule/welcome'
// import schedule from '../pages/schedule'
import MainTabNavigator from './TapNav';


const LoginNavigation = createStackNavigator({
    welcome:{
        screen: welcome,
        navigationOptions:{
            headerShown: false,
        }
    },
    Home:{
        screen:MainTabNavigator
    }
},{
    initialRouteName:'welcome'
});

const AppContainer = createAppContainer(LoginNavigation);

export default AppContainer;
