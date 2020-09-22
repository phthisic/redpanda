import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_text: '',
      user_email: '',
      pass_text: '',
      pass_confirm: '',
      newAccountColor: '#e0e0e0',
      emailColor: '#e0e0e0',
      newPasswordColor: '#e0e0e0',
      passwordConfirmColor: '#e0e0e0',
    };
  }

  AccountColorBlue = () => {
    this.setState({newAccountColor: '#779EEB'});
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
  AccountColorGrey = () => {
    if (this.state.user_text == '') {
      this.setState({newAccountColor: '#F55F5F'});
    } else {
      this.setState({newAccountColor: '#e0e0e0'});
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

  signup = () => {
    if (
      this.state.user_text != '' &&
      this.state.pass_text != '' &&
      this.state.pass_text == this.state.pass_confirm
    ) {
      this.setState({newAccountColor: '#e0e0e0'});
      this.setState({emailColor: '#e0e0e0'});
      this.setState({newPasswordColor: '#e0e0e0'});
      this.setState({passwordConfirmColor: '#e0e0e0'});
      const {navigate} = this.props.navigation;
      //   navigate('welcome', {
      //     userId: this.state.user_text,
      //     userPass: this.state.pass_text,
      //   });
      this.props.navigation.state.params.returnData(
        this.state.user_text,
        this.state.pass_text,
      );
      this.props.navigation.goBack();
    } else {
      this.AccountColorGrey();
      this.PasswordColorGrey();
      this.EmailColorGrey();
      this.PasswordConfirmColorGrey();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <View>
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.newAccountColor}]}
            placeholder="Account"
            onFocus={() => this.AccountColorBlue()}
            onBlur={() => this.AccountColorGrey()}
            onChangeText={(user_text) =>
              this.setState({user_text})
            }></TextInput>
          <TextInput
            style={[styles.inputBox, {borderColor: this.state.emailColor}]}
            placeholder="email"
            onFocus={() => this.EmailColorBlue()}
            onBlur={() => this.EmailColorGrey()}
            onChangeText={(user_email) =>
              this.setState({user_email})
            }></TextInput>
          <TextInput
            style={[
              styles.inputBox,
              {borderColor: this.state.newPasswordColor},
            ]}
            placeholder="Password"
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
            <Text style={styles.buttonText} onPress={() => this.signup()}>
              CONFIRM
            </Text>
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
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
