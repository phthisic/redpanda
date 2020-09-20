import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import schedule from '../pages/schedule'
import camera from '../pages/camera'

const CameraNavigation = createStackNavigator({
    schedule: schedule,
    camera: camera
},{
    initialRouteName:'schedule'
});

const CameraContainer = createAppContainer(CameraNavigation);


export default CameraNavigation;
