
import React, { Component } from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';

export default class getPassword extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor:'#258356', justifyContent:'center', alignItems:'center'}}>
                <Text>getPassword</Text>
                <Button title="getPassword" onPress={()=>this.props.navigation.navigate('welcome')}></Button>
            </View>
        );
    }
}