import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';

import {RNCamera, TakePictureResponse} from 'react-native-camera';

export default class ReactNativeDemo extends Component {

    //get the back camera
    state = { cameraType: RNCamera.Constants.Type.back };

    //scan QRcode
    _onBarCodeRead(e){
        //data: string;
        //rawData?: string;
        //type: keyof BarCodeType;
        //bounds:
          //For iOS use `{ origin: Point<string>, size: Size<string> }`
          //For Android use `{ width: number, height: number, origin: Array<Point<string>> }`
        console.log(e)
    }

    //switch direction     undefined is not an object (evaluating 'state.cameraType')
    _switchCamera(){
        this.setState({
            cameraType: (this.state.cameraType === RNCamera.Constants.Type.back) ?
                RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        })
        // let state = this.state;
        // state.cameraType = (state.cameraType === RNCamera.Constants.Type.back) ?
        //     RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
        // this.setState(state);
    }

    _takePicture(){
        this.refs.camera.takePictureAsync().then( (response) => {
            console.log("response.uri:"+response.uri)
        }).catch((error => {
            console.log("error:"+error)
        }))
    }

    render() {
        return (
            <RNCamera
                ref="camera"
                style={styles.container}
                onBarCodeRead={this._onBarCodeRead.bind(this)}
                type={this.state.cameraType}
            >
                <TouchableHighlight onPress={this._switchCamera.bind(this)}>
                    <Text style={styles.switch}>Switch Camera</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._takePicture.bind(this)}>
                    <Text style={styles.picture}>Take Picture</Text>
                </TouchableHighlight>
            </RNCamera>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    switch: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    },
    picture: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    }
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);