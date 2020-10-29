import React, {Component} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import ScheduleNavigation from './scheduleNav';
import HealthDataNavigation from './healthDataNav';
import SettingNavigation from './SettingNav';

// create the tabbar
const TABS = {
  schedule: {
    screen: ScheduleNavigation,
    navigationOptions: {
      tabBarLabel: 'Medication Schedule',
      tabBarIcon: ({focused}) => {
        // if the tabbar is not focused the button should be shown as inactived.
        if (!focused) {
          return (
            <View style={styles.container}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/medicationScheduleGrey.png')}></Image>
              <Text style={styles.text}>Medication Schedule</Text>
            </View>
          );
          // if the tabbar is focused the button should be shown as actived.
        } else {
          return (
            <View style={styles.focusedContainer}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/medicationScheduleBlue.png')}></Image>
              <Text style={styles.focusedText}>Medication Schedule</Text>
            </View>
          );
        }
      },
      
    },
  },

  healthdata: {
    screen: HealthDataNavigation,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        if (!focused) {
          return (
            <View style={styles.container}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/healthDataGrey.png')}></Image>
              <Text style={styles.text}>Health Data</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.focusedContainer}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/healthDataBlue.png')}></Image>
              <Text style={styles.focusedText}>Health Data</Text>
            </View>
          );
        }
      },
    },
  },

  settingpage: {
    screen: SettingNavigation,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({focused}) => {
        if (!focused) {
          return (
            <View style={styles.container}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/SettingGrey.png')}></Image>
              <Text style={styles.text}>Setting</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.focusedContainer}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/images/SettingBlue.png')}></Image>
              <Text style={styles.focusedText}>Setting</Text>
            </View>
          );
        }
      },
    },
  },
};

class MainTabNavigator extends Component {
  componentDidMount() {
    // console.log("username is " + this.props.navigation.state.params.userId);
  }
  // pass user id through the tabbar
  aaa = this.props.navigation.state.params.userId
  _tabnavigator() {
    const { schedule, healthdata, settingpage } = TABS;
    const tabs = { schedule, healthdata, settingpage };
    if (!this.tabNavigator) {
      this.tabNavigator = createAppContainer(
        createBottomTabNavigator(tabs, {
          tabBarComponent: (props) => <BottomTabBar {...props} />,
          tabBarOptions: {
            showLabel: false,
            initialRouteName: 'schedule',
            style: {
              elevation: 3,
            },
          },
        }),
      );
    }
    return this.tabNavigator;
  }

  render() {
    const TabNavigator = this._tabnavigator();
    return <TabNavigator></TabNavigator>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation:3
  },
  focusedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#46BEDB',
    borderBottomWidth: 2,
    width: '100%',
  },
  text: {
    fontSize: 12,
    marginVertical: 2,
    color: '#97a1b2',
  },
  focusedText: {
    fontSize: 12,
    marginVertical: 2,
    color: '#46BEDB',
  },
});

export default MainTabNavigator;
