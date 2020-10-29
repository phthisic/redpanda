import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import {AsyncStorage} from 'react-native';
import {sub} from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
export default class accountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      newCodeColor: '#e0e0e0',
      emailColor: '#e0e0e0',
      accountInputBox: false,
      userImageName: '',
      userId: '',
    };
  }

  componentDidMount() {
    auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    AsyncStorage.getItem('currentUser').then((result) => {
      if (result) {
        this.setState({
          currentUser: result,
        });
        firestore()
          .collection('Users')
          .where('Account', '==', this.state.currentUser)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              this.setState({
                userId: documentSnapshot.id,
                userEmail: documentSnapshot.get('Email')
              });
              const imageId = documentSnapshot.get('Image');
              firestore()
                .collection('Portrait')
                .doc(imageId)
                .get()
                .then((documentSnapshot) => {
                  this.setState({
                    avatarSource: documentSnapshot.get('Url'),
                  });
                  console.log(this.state.avatarSource);
                });
            });
          });
      }
    });
  }

  // control the border color of input boxes
  EmailColorBlue = () => {
    this.setState({emailColor: '#779EEB'});
  };
  EmailColorGrey = () => {
    if (this.state.user_email == '') {
      this.setState({emailColor: '#F55F5F'});
    } else {
      this.setState({emailColor: '#e0e0e0'});
    }
  };

  // selece avatar from photo
  choosePhoto = () => {
    // can be ignored unless you want to let users choose the resource of the images.
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // the interface is provided by android by default
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          avatarSource: response.uri,
        });
        this.setState({
          avatarPath: response.path,
        });
        this.setState({
          userImageName: response.fileName,
        });
        this.uploadImage();
      }
    });
  };

  uploadImage = async () => {
    const reference = storage().ref(this.state.userImageName);
    // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/avatar.jpg`;
    // uploads file
    await reference.putFile(this.state.avatarPath);
    const url = await storage().ref(this.state.userImageName).getDownloadURL();
    console.log('url:' + url);
    firestore()
      .collection('Portrait')
      .add({
        Name: this.state.userImageName,
        Url: url,
      })
      .then((documentSnapshot) => {
        console.log('image added!');
        firestore()
          .collection('Users')
          .doc(this.state.userId)
          .update({
            Image: documentSnapshot.id,
          })
          .then(() => {
            console.log('User updated!');
          });
      });
  };

  log(userEmail){
    console.log(userEmail)
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
                source={require('../../assets/images/backArrowWhite.png')}
              />
            </TouchableHighlight>
            <Text style={styles.headerText}>Account Information</Text>
          </LinearGradient>
        </View>

        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.choosePhoto()}>
            <Image
              source={{uri: this.state.avatarSource}}
              style={styles.avatar}
            />
          </TouchableHighlight>

          <View style={{flex:1, paddingVertical:24}}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Account</Text>
              <TextInput
                editable={false}
                style={[styles.inputBox, {borderColor: '#e0e0e0'}]}
                placeholder={this.state.currentUser} />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.title}>E-mail</Text>
              <TextInput
                style={[styles.inputBox, {borderColor: this.state.emailColor}]}
                placeholder={this.state.userEmail}
                onFocus={() => this.EmailColorBlue()}
                onBlur={() => this.EmailColorGrey()}
                onChangeText={(userEmail) =>
                  this.log({userEmail})
                } />
            </View>
          </View>
        </View>
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
  container: {
    flex:1,
    paddingHorizontal:24
  },
  avatar: {
    width: 140,
    height: 140,
    backgroundColor: '#50DDE3',
    marginTop: 32,
    alignSelf: 'center',
    borderRadius: 100,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:24
  },
  title: {
    color: '#63738c',
    fontSize: 24,
  },
  inputBox: {
    width:240,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 20,
  },
});
