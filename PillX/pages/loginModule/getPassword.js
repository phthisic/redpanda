import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class getPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user info variable
      user_code: '',
      user_email: '',
      pass_text: '',
      pass_confirm: '',
      // border color variabel
      newCodeColor: '#e0e0e0',
      emailColor: '#e0e0e0',
      newPasswordColor: '#e0e0e0',
      passwordConfirmColor: '#e0e0e0',
    };
  }

  // control the color of input boxes
  // border turn red for invalid data
  CodeColorBlue = () => {
    this.setState({newCodeColor: '#779EEB'});
  };
  EmailColorBlue = () => {
    this.setState({emailColor: '#779EEB'});
  };
  PasswordColorBlue = () => {
    this.setState({newPasswordColor: '#779EEB'});
  };
  PasswordConfirmColorBlue = () => {
    this.setState({passwordConfirmColor: '#779EEB'});
  };
  CodeColorGrey = () => {
    if (this.state.user_code == '') {
      this.setState({newCodeColor: '#F55F5F'});
    } else {
      this.setState({newCodeColor: '#e0e0e0'});
    }
  };
  EmailColorGrey = () => {
    if (this.state.user_email == '') {
      this.setState({emailColor: '#F55F5F'});
    } else {
      this.setState({emailColor: '#e0e0e0'});
    }
  };
  PasswordColorGrey = () => {
    if (this.state.pass_text == '') {
      this.setState({newPasswordColor: '#F55F5F'});
    } else {
      this.setState({newPasswordColor: '#e0e0e0'});
    }
  };
  PasswordConfirmColorGrey = () => {
    if (this.state.pass_confirm == '') {
      this.setState({passwordConfirmColor: '#F55F5F'});
    } else {
      this.setState({passwordConfirmColor: '#e0e0e0'});
    }
  };

  // 1. change the border color
  // 2. get information
  // 3. navigate to welcome page
  getPassword = () => {
    if (
      this.state.user_code != '' &&
      this.state.pass_text != '' &&
      this.state.pass_text == this.state.pass_confirm
    ) {
      this.setState({newCodeColor: '#e0e0e0'});
      this.setState({emailColor: '#e0e0e0'});
      this.setState({newPasswordColor: '#e0e0e0'});
      this.setState({passwordConfirmColor: '#e0e0e0'});
      const {navigate} = this.props.navigation;
      this.props.navigation.state.params.returnData(
        this.state.user_code,
        this.state.pass_text,
      );
      this.props.navigation.goBack();
    } else {
      this.EmailColorGrey();
      this.CodeColorGrey();
      this.PasswordColorGrey();
      this.PasswordConfirmColorGrey();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <View>
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.newCodeColor}]}
            placeholder="E-mail"
            onFocus={() => this.EmailColorBlue()}
            onBlur={() => this.EmailColorBlue()}
            onChangeText={(user_email) =>
              this.setState({user_email})
            }></TextInput>
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.emailColor}]}
            placeholder="Verification code"
            onFocus={() => this.CodeColorBlue()}
            onBlur={() => this.CodeColorGrey()}
            onChangeText={(user_code) =>
              this.setState({user_code})
            }></TextInput>
          <TextInput
            style={[
              styles.inputBox,
              {borderColor: this.state.newPasswordColor},
            ]}
            placeholder="New password"
            onFocus={() => this.PasswordColorBlue()}
            onBlur={() => this.PasswordColorGrey()}
            onChangeText={(pass_text) =>
              this.setState({pass_text})
            }></TextInput>
          <TextInput
            style={[
              styles.inputBox,
              {borderColor: this.state.passwordConfirmColor},
            ]}
            placeholder="Password confirm"
            onFocus={() => this.PasswordConfirmColorBlue()}
            onBlur={() => this.PasswordConfirmColorGrey()}
            onChangeText={(pass_confirm) =>
              this.setState({pass_confirm})
            }></TextInput>
          
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#46BEDB', '#50DDE3']}
              style={styles.linearGradient}>
              <Text
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('welcome')}>
                CONFIRM
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#666',
    fontSize: 40,
    marginBottom: 30,
  },
  linearGradient:{
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
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
