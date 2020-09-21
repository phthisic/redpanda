import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

export default class welcome extends Component {

//     // set the time count for enter login page
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: 1,
//     };
//   }

//   componentDidMount() {
//     //start the alarm
//     this.startTimer();
//   }

//   startTimer() {
//     let timeChange;
//     //Using time to replace state.time so the time would only update in render but not in the function.
//     let time = this.state.time;
//     const clock = () => {
//       if (time > 0) {
//         //update the function when time>0
//         time = time - 1;
//         this.setState({
//           time: time,
//         });
//         console.log(time);
//       } else {
//         //stop the function when time=0
//         clearInterval(timeChange);
//         //go to the login page
//         this.props.navigation.navigate('Home');
//       }
//     };
//     //run the clock function per second
//     timeChange = setInterval(clock, 1000);
//   }

 

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E0F7FA',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View></View>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/images/logo_pill.png')}></Image>
        <Text>PillX</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
