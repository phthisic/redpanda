import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';

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
        console.log(time);
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
  changeAccountColorBlue = () => {this.setState({accountColor: '#779EEB'});};
  changePasswordColorBlue = () => {this.setState({passwordColor: '#779EEB'});};
  changeAccountColorGrey = () => {if (this.state.user_text == '') {this.setState({accountColor: '#F55F5F'});} 
    else {this.setState({accountColor: '#e0e0e0'});}};
  changePasswordColorGrey = () => {if (this.state.pass_text == '') {this.setState({passwordColor: '#F55F5F'});} 
    else {this.setState({passwordColor: '#e0e0e0'});}};

  // 1. navigate to the tabNav, which is the schedule page
  // 2. pass the userId to tabNav
  // 3. set the border color if user does not input
  login = () => {
    if (this.state.user_text != '' && this.state.pass_text != '') {
      this.setState({accountColor: '#e0e0e0'});
      this.setState({passwordColor: '#e0e0e0'});
      const {navigate} = this.props.navigation;
      navigate('Home', {userId: this.state.user_text});
    } else {
      this.changeAccountColorGrey();
      this.changePasswordColorGrey();
    }
  };

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
            source={require('../assets/images/logo_pill.png')}></Animated.Image>
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
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            {/* two links for users to sign up and get password back */}
            <Text style={[styles.bottomText, {marginTop: 12}]}>
              Not have an account?
            </Text>
            <Text style={styles.bottomText}>Forget your password?</Text>
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
  button: {
    marginTop: 20,
    padding: 10,
    paddingRight: 150,
    paddingLeft: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#779EEB',
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  bottomText: {
    color: '#789FEC',
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
  }
});
