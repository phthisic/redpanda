import React, {Component} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
import LinearGradient from 'react-native-linear-gradient';
import {DatePicker} from 'react-native-wheel-pick';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {AsyncStorage} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class inputHealthData extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: '',
      Pressure: 0,
      Sugar: 0,
      OxygenSat: 0,
      Temperature: 0,
      valueArray: [],
      disabled: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser').then((result) => {
      if (result) {
        this.setState({
          currentUser: result,
        });
      }
    });
  }

  toggleSwitch = (value) => {
    this.setState({currentDate: value});
    console.log(this.state.currentDate)
  };

  submit = () => {
    firestore()
      .collection('HealthData')
      .add({
        Account: this.state.currentUser,
        Pressure: parseInt(this.state.inputBloodPressure),
        Sugar: parseInt(this.state.inputBloodSugar),
        OxygenSat: parseInt(this.state.inputOxygenSat),
        Temperature: parseInt(this.state.inputTemperature),
        Date: this.state.currentDate,
        Id:
          this.state.currentUser +
          this.state.Date +
          this.state.inputBloodPressure +
          this.state.inputBloodSugar +
          this.state.inputOxygenSat +
          this.state.inputTemperature,
      })
      .then(function (docRef) {
        console.log('New Health Data Added with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });

    this.props.navigation.state.params.refresh();
    this.props.navigation.navigate('healthdata');
  };

  render() {
    return (
      <View>


        {/* 顶部导航 page header */}
        <View style={{backgroundColor: '#eee', elevation: 7}}>
          <View style={{height: 22, backgroundColor: '#46BEDB'}}></View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={styles.header}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.imagesSize}
                source={require('../assets/images/backArrowWhite.png')}
              />
            </TouchableHighlight>
            <Text style={styles.headerText}>Create a New Record</Text>
          </LinearGradient>
        </View>

        
        <ScrollView>
          <DatePicker
            mode={'date'}
            style={[styles.pickbox, {backgroundColor: 'white', height: 200}]}
            onDateChange={this.toggleSwitch}
          />
        </ScrollView>
        <TextInput
          style={styles.input}
          borderColor="grey"
          underlineColorAndroid="transparent"
          placeholder="Please input blood pressure"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(inputBloodPressure) =>
            this.setState({inputBloodPressure})
          }
        />
        <TextInput
          style={styles.input}
          borderColor="grey"
          underlineColorAndroid="transparent"
          placeholder="Please input blood sugar"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(inputBloodSugar) => this.setState({inputBloodSugar})}
        />
        <TextInput
          style={styles.input}
          borderColor="grey"
          underlineColorAndroid="transparent"
          placeholder="Please input oxygen saturation"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(inputOxygenSat) => this.setState({inputOxygenSat})}
        />
        <TextInput
          style={styles.input}
          borderColor="grey"
          underlineColorAndroid="transparent"
          placeholder="Please input body temperature"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(inputTemperature) => this.setState({inputTemperature})}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  imagesSize: {
    width: 30,
    height: 30,
    marginRight: 24,
  },
  viewHolder: {
    height: 170,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    elevation: 5,
  },
  pickbox: {
    backgroundColor: 'white',
    height: 200,
    marginVertical: 8,
  },
  buttonDesign: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 8,
  },
  linearGradient: {
    padding: 10,
    paddingRight: 150,
    paddingLeft: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
