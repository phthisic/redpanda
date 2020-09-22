import React, {Component} from 'react';
import {Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
// import schedule from '../pages/schedule';
import healthdata from '../pages/healthdata';
import settingpage from '../pages/settingpage';

import CameraNavigation from './cameraNav'

const TABS = {
  schedule: {
    screen: CameraNavigation,
    navigationOptions: {
      // userId:this.props.navigation.state.params.userId,
      tabBarLabel: 'schedule',
      tabBarIcon: ({focused}) => {
        if (!focused) {
          return <Text>s1</Text>;
        } else {
          return <Text>s2</Text>;
        }
      }
    }
  },

  healthdata: {
    screen: healthdata,
    navigationOptions: {
      tabBarLabel: 'healthdata',
      tabBarIcon: ({focused}) => {
        if (!focused) {
          return <Text>h1</Text>;
        } else {
          return <Text>h2</Text>;
        }
      }
    }
  },

  settingpage: {
    screen: settingpage,
    navigationOptions: {
      tabBarLabel: 'settingpage',
      tabBarIcon: ({focused}) => {
        if (!focused) {
          return <Text>s3</Text>;
        } else {
          return <Text>s4</Text>;
        }
      }
    }
  }
};

class MainTabNavigator extends Component{
  componentDidMount(){
    console.log("tabhjer"+this.props.navigation.state.params.userId);
}

  _tabnavigator(){
    const {schedule,healthdata,settingpage} = TABS;
    const tabs = {schedule,healthdata,settingpage};
    if(!this.tabNavigator){
      this.tabNavigator = createAppContainer(createBottomTabNavigator(
        tabs,{tabBarComponent: props => (
          <BottomTabBar {...props}/>
        ),}
      ))
    }
    return this.tabNavigator;
  }

  render(){
    const TabNavigator = this._tabnavigator();
    return <TabNavigator></TabNavigator>
  }
}

export default MainTabNavigator;
