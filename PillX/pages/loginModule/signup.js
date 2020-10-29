import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user information variable
      user_text: '',
      user_email: '',
      pass_text: '',
      pass_confirm: '',
      // border color variable
      newAccountColor: '#e0e0e0',
      emailColor: '#e0e0e0',
      newPasswordColor: '#e0e0e0',
      passwordConfirmColor: '#e0e0e0',
    };
  }

  // control the color change
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


  // 1. change border color
  // 2. get information from user input and insert new account data to database
  // 3. navigate to welcome
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

      var inputUsername = this.state.user_text;
      var inputEmail = this.state.user_email;
      var inputPassword = this.state.pass_text;

      var duplicateAccounts = [];
      firestore()
        .collection('Users')
        .where('Account', '==', inputUsername)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            duplicateAccounts.push(doc.data());
          });
          // find same account in the firebase, if exist, reject.
          if (duplicateAccounts.length != 0) {
            window.alert('Account already exists!');
          } else {
            firestore()
              .collection('Users')
              .add({
                Account: inputUsername,
                Email: inputEmail,
                Password: inputPassword,
              })
              .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
              })
              .catch(function (error) {
                console.error('Error adding document: ', error);
              });
            //pass the logged in username to Home
            AsyncStorage.setItem('currentUser', inputUsername);
            navigate('Home', {userId: inputUsername});
          }
        });
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
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#46BEDB', '#50DDE3']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText} onPress={() => this.signup()}>
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
