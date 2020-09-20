import React, { Component } from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';

export default class login extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor:'#258356', justifyContent:'center', alignItems:'center'}}>
                <Text>login</Text>
                <Button title="login" onPress={()=>this.props.navigation.navigate('Home')}></Button>
            </View>
        );
    }
}