import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class schedule extends Component {
    componentDidMount(){
        // console.log(this.props.navigation.state.params.userId);
    }

  render() {
      
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#258356',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>schedule</Text>
        <Button
          title="camera"
          onPress={() => this.props.navigation.navigate('camera')}></Button>
      </View>
    );
  }
}
