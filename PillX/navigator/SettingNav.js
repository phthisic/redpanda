import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import setting from '../pages/settingModule/settingpage'
import accountInfo from '../pages/settingModule/accountInfo'

// page stack for setting module
const SettingNavigation = createStackNavigator({
    setting: {
        screen:setting,
        navigationOptions:{
            title:"Setting",
            headerShown: false,
            // headerTitleAlign:"center"
        }
    },
    accountInfo:{
        screen:accountInfo,
        
        navigationOptions:{
            title:'Account Information',
            headerShown: false,
        }
    } 
}, {
    initialRouteName: 'setting',
    navigationOptions:({navigation})=>({
        // hide tabbar for secondary page
        tabBarVisible:navigation.state.index === 0,
    })
},);


export default SettingNavigation;
