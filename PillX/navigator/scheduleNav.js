import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import schedule from '../pages/scheduleModule/schedule';
import camera from '../pages/scheduleModule/ScanQRCode';
import mediInfo from '../pages/scheduleModule/mediInfo';

// page stack for schedule module
// camera and medi info pages are included as secondary page
const ScheduleNavigation = createStackNavigator(
  {
    schedule: {
      screen: schedule,
      navigationOptions: {
        headerShown: false,
        title: 'Medicine Schedule',
      },
    },
    mediInfo: {
      screen: mediInfo,
      navigationOptions: {
        headerShown: false,
      },
    },
    camera: {
      screen: camera,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'schedule',
    navigationOptions: ({navigation}) => ({
      // hide tabbar for secondary page
      tabBarVisible: navigation.state.index === 0,
    }),
  },
);

export default ScheduleNavigation;
