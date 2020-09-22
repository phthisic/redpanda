import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import welcome from './welcome'
import signup from './signup'
import getPassword from './getPassword'

const LoginNavigation = createStackNavigator({
    welcome: {
        screen: welcome,
        navigationOptions:{
            headerShown: false,
        }
    },
    signup: {
        screen: signup,
        navigationOptions:{
            headerShown: false,
        }
    },
    getPassword: {
        screen: getPassword,
        navigationOptions:{
            headerShown: false,
        }
    },
},{
    initialRouteName:'welcome'
});

const LoginContainer = createAppContainer(LoginNavigation);



export default LoginContainer;
