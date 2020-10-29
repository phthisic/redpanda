import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import welcome from '../../PillX/pages/loginModule/welcome'
import MainTabNavigator from './TapNav';
import LoginContainer from './loginNav'

// the main stack 
const AppNavigation = createStackNavigator({
    welcome:{
        screen: welcome,
        navigationOptions:{
            headerShown: false,
        }
    },
    Home:{
        screen:MainTabNavigator,
        navigationOptions:{
            headerShown: false,
        }
    },
    login:{
        screen:LoginContainer,
        navigationOptions:{
            headerShown: false,
        }
    }
},{
    initialRouteName:'welcome'
});

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;
