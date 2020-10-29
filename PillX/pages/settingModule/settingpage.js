import React, {Component,useState } from 'react';
import {View, Text, Image,Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {withOrientation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';

export default class settingpage extends Component {
  constructor(props) {
    super(props);
    this.state={
      switch1Value:false,
    }
  }

  // change the font size
  // the variabel is global and stated in the globalText.js
  // import in the app.js
  toggleSwitch = (value) => {
    this.setState({switch1Value: value});
    if(value){
      fontSize.fontSizePlus=12
    }else{
      fontSize.fontSizePlus=0
    }
  };

  logout() {
    console.log('back');
    RNRestart.Restart();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* page header */}
        <View style={{backgroundColor: '#eee', elevation: 7}}>
          <View style={{height: 22, backgroundColor: '#46BEDB'}}></View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={styles.header}>
            <Text style={styles.headerText}>Setting</Text>
          </LinearGradient>
        </View>

        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('accountInfo')}>
              <View style={styles.buttonContent}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/images/profileBlue.png')}
                />
                <Text style={styles.buttonText}>Account</Text>
              </View>
              <Image
                style={{width: 20, height: 30}}
                source={require('../../assets/images/arrowBlue.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {marginTop: 12}]}>
              <View style={styles.buttonContent}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/images/font.png')}
                />
                <Text style={styles.buttonText}>Big Font</Text>
              </View>
              <Switch
              thumbColor={{false: '#888', true: '#46BEDB'}}
              trackColor={{false: '#aaa', true: '#46BEDB'}}
              onValueChange={this.toggleSwitch}
              value={this.state.switch1Value}
            />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.bottombutton}
              onPress={() => this.logout()}>
              <View style={styles.buttonContent}>
                <Text style={styles.bottombuttonText}>LOG OUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 21,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#212121',
    fontSize: 20,
    paddingLeft: 21,
  },
  bottombutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  bottombuttonText: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
    paddingLeft: 21,
  },
});
