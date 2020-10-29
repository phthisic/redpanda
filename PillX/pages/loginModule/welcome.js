import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {NavigationActions, StackActions} from 'react-navigation';

export default class welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for countdown function
      time: 1,
      // for animation in countdown function
      pillScale: new Animated.Value(1),
      buttonOpacity: new Animated.Value(0),
      containerPadding: new Animated.Value(15),
      // for login function
      user_text: '',
      pass_text: '',
      // for changing color of the input box (TextInput)
      accountColor: '#e0e0e0',
      passwordColor: '#e0e0e0',
    };
  }

  componentDidMount() {
    // countdown function is called before rendering page
    // because it is used for animation for showing the welcome page
    this.startTimer();
  }

  startTimer() {
    // countdown
    let timeChange;
    let time = this.state.time;
    const clock = () => {
      if (time > 0) {
        time = time - 1;
        this.setState({
          time: time,
        });
        // console.log(time);
      } else {
        clearInterval(timeChange);

        //animation
        Animated.spring(this.state.pillScale, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.buttonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.spring(this.state.containerPadding, {
          toValue: 32,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };

    //control the speed of the timing function's update
    timeChange = setInterval(clock, 500);
  }

  // four functions to change the color of the TextInput
  changeAccountColorBlue = () => {
    this.setState({accountColor: '#779EEB'});
  };
  changePasswordColorBlue = () => {
    this.setState({passwordColor: '#779EEB'});
  };
  changeAccountColorGrey = () => {
    if (this.state.user_text == '') {
      this.setState({accountColor: '#F55F5F'});
    } else {
      this.setState({accountColor: '#e0e0e0'});
    }
  };
  changePasswordColorGrey = () => {
    if (this.state.pass_text == '') {
      this.setState({passwordColor: '#F55F5F'});
    } else {
      this.setState({passwordColor: '#e0e0e0'});
    }
  };

  // 1. navigate to the tabNav, which is the schedule page
  // 2. pass the userId to tabNav
  // 3. set the border color if user does not input
  login = () => {
    if (this.state.user_text != '' && this.state.pass_text != '') {
      this.setState({accountColor: '#e0e0e0'});
      this.setState({passwordColor: '#e0e0e0'});
      const {dispatch} = this.props.navigation;
      // Lichao part  ||||| 23/09/2020   ||||| might be modified later
      var matchedAccounts = [];
      var matchedPasswords = [];
      var inputUsername = this.state.user_text;
      var inputPassword = this.state.pass_text;

      firestore()
        .collection('Users')
        .where('Account', '==', inputUsername)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            matchedAccounts.push(doc.data());
          });
          if (matchedAccounts.length == 0) {
            window.alert('No such account exists!');
          } else {
            firestore()
              .collection('Users')
              .where('Password', '==', inputPassword)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  matchedPasswords.push(doc.data());
                });
                if (matchedPasswords.length != 0) {
                  //pass the logged in username to Home

                  AsyncStorage.setItem('currentUser', inputUsername);
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'Home',
                        params: {
                          userId: inputUsername,
                        },
                      }),
                    ],
                  });
                  dispatch(resetAction);
                } else {
                  window.alert('Incorrect Password!');
                }
              });
          }
        });
    } else {
      this.changeAccountColorGrey();
      this.changePasswordColorGrey();
    }
  };

  returnData(id, password) {
    this.setState({user_text: id, pass_text: password});
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {paddingBottom: this.state.containerPadding, zIndex: -100},
        ]}>
        {/* icon picture and title */}
        <Animated.View
          style={{
            transform: [{scale: this.state.pillScale}],
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            style={styles.pillxLogo}
            source={require('../../assets/images/logo_pill.png')}></Animated.Image>
          <Text style={styles.title}>PillX</Text>
        </Animated.View>

        <Animated.View
          style={{
            backgroundColor: '#fff',
            opacity: this.state.buttonOpacity,
          }}>
          {/* two box for user to input */}
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.accountColor}]}
            placeholder="Account"
            onFocus={() => this.changeAccountColorBlue()}
            onBlur={() => this.changeAccountColorGrey()}
            onChangeText={(user_text) =>
              this.setState({user_text})
            }></TextInput>
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.passwordColor}]}
            placeholder="Password"
            onFocus={() => this.changePasswordColorBlue()}
            onBlur={() => this.changePasswordColorGrey()}
            onChangeText={(pass_text) =>
              this.setState({pass_text})
            }></TextInput>

          <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
            {/* login button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.login()}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#46BEDB', '#50DDE3']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* two links for users to sign up and get password back */}
            <TouchableOpacity
              style={{marginTop: 12}}
              onPress={() =>
                this.props.navigation.navigate('signup', {
                  returnData: this.returnData.bind(this),
                })
              }>
              <Text style={styles.bottomText}>Not have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('getPassword')}>
              <Text style={styles.bottomText}>Forget your password?</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pillxLogo: {
    width: 180,
    height: 180,
  },
  title: {
    color: '#666',
    fontSize: 60,
    marginTop: 30,
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
    fontSize: 24,
  },
  bottomText: {
    color: '#46BEDB',
    fontSize: 16,
    opacity: 0.8,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
