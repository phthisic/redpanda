import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  default as Easing,
  ImageBackground,
  View,
  Text,
  Image,
  Alert,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';

let camera;

const ScanQRCode = ({navigation, route}) => {
  const moveAnim = useRef(new Animated.Value(-2)).current;

  // will be used before render the page
  useEffect(() => {
    requestCameraPermission();
    startAnimation();
  }, []);

  //ask for permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Can we use your camera？',
          message: 'We need to use camera to scan the QR code',
          buttonNeutral: 'ask me later',
          buttonNegative: 'no',
          buttonPositive: 'yes',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Now you have the permission');
      } else {
        // console.log('user do not give permission');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // animation of the scan window
  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 200,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        toValue: -1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => startAnimation());
  };

  //get the scan data from camera
  const onBarCodeRead = (result) => {
    const {data} = result; //get data of QR code
    //actions after the scan
    console.log('this qrcode contain a data of ' + data);
    if (data != '') {
      navigation.navigate('mediInfo', {drugName: data});
    } else {
      Alert.alert('Sorry, but this QR code is not avaliable', [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]);
    }
  };

  // transform base64 data from qr picture to readable data
  const recognize = async (photoresult) => {
    let data = await LocalBarcodeRecognizer.decode(photoresult, {
      codeTypes: ['ean13', 'qr'],
    });

    console.log(data);

    if (data != '') {
      navigation.navigate('mediInfo', {drugName: data});
    } else {
      Alert.alert('Sorry, but this QR code is not avaliable', [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]);
    }
  };

  // select qr picture from local photos
  const choosePhoto = () => {
    let photoresult = '';
    // can be ignored unless you want to let users choose the resource of the images.
    const options = {
      title: 'Select QR code image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // the interface is provided by android by default
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        navigation.navigate('camera');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // key data
        photoresult = response.data;
        recognize(photoresult);
      }
    });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on} 
        style={[styles.preview]}
        type={RNCamera.Constants.Type.back} 
        flashMode={RNCamera.Constants.FlashMode.off} 
        onBarCodeRead={onBarCodeRead}>
        <TouchableHighlight
          style={{alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../assets/images/camera-close.png')}></Image>
        </TouchableHighlight>

        <View style={[{alignItems: 'center'}]}>
          <ImageBackground
            source={require('../../assets/images/scan.png')}
            style={{width: 200, height: 200}}>
            <Animated.View
              style={[styles.border, {transform: [{translateY: moveAnim}]}]}
            />
          </ImageBackground>
          <Text style={styles.rectangleText}>Scan QRcode here</Text>
        </View>

        <TouchableHighlight
          style={{alignSelf: 'flex-end'}}
          onPress={() => choosePhoto()}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{height: 50, width: 50}}
              source={require('../../assets/images/album.png')}></Image>
            <Text style={{color: '#fff', textAlign: 'center'}}>Album</Text>
          </View>
        </TouchableHighlight>
      </RNCamera>
      <StatusBar hidden={true}></StatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rectangleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#46BEDB',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 196,
    height: 2,
    backgroundColor: '#46BEDB',
    borderRadius: 50,
  },
});

export default ScanQRCode;
