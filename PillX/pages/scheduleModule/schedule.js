import React, {Component} from 'react';
import {
  View,
  Text,
  DrawerLayoutAndroid,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  AppRegistry,
  TouchableHighlight,
  StatusBar,
  Button,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';
import {ScrollView} from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {NavigationEvents} from 'react-navigation';
import NotifService from './NotifService';
import {min, set} from 'react-native-reanimated';
import {DatePicker} from 'react-native-wheel-pick';
import Dialog from 'react-native-dialog';

export default class schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifNotificationAll: true,
      ifNotification: true,
      inputDrugName: '',
      currentUser: '',
      storeDrugName: '',
      dbData: [],
      lastDrugName: '',
      checked: 'first',
      slist: [], // render data
      originList: [], // raw data
      text: '', // input text
      avatarSource: require('../../assets/images/head.png'),
      timeWindow: false,
      drugName: '',
      timeHour: '',
      timeMin: '',
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  componentDidMount() {
    // check if the user has changed avatar
    this._navListener = this.props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.getAvatar();
      },
    );
    AsyncStorage.getItem('currentUser').then((result) => {
      if (result) {
        this.setState({
          currentUser: result,
        });
        this.getAvatar();
      }
    });
    this.getScrollDrugList();
    this.getSchedule();
    this.getUserInfo();
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(
      'Hi! ' + this.state.currentUser,
      "It's time to take the pills!",
    );
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  getAvatar() {
    // get avatar
    firestore()
      .collection('Users')
      .where('Account', '==', this.state.currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.setState({
            userId: documentSnapshot.id,
          });
          const imageId = documentSnapshot.get('Image');
          firestore()
            .collection('Portrait')
            .doc(imageId)
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.get('Url') != null) {
                this.setState({
                  avatarSource: {uri: documentSnapshot.get('Url')},
                });
              }
            });
        });
      });
  }

  // get the medicine list in database
  // list would show when click plus button
  getScrollDrugList() {
    firestore()
      .collection('Drugs')
      .orderBy('Name', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.state.slist.push({
            name: documentSnapshot.get('Name'),
            id: documentSnapshot.id,
          });
        });
      });
    this.setState({
      slist: this.state.slist,
      originList: this.state.slist,
    });
  }

  getSchedule() {
    var tempDataUse = [];
    var tempData = [];
    firestore()
      .collection('ScheduleInfo')
      .orderBy('Time', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempData.push(doc.data());
        });
        for (var j = 0; j < tempData.length; j++) {
          if (tempData[j]['Account'] == this.state.currentUser) {
            tempDataUse.push(tempData[j]);
          }
        }
        this.setState({
          dbData: tempDataUse,
        });
      });
  }

  getUserInfo() {
    var tempUserInfos = [];
    AsyncStorage.getItem('currentUser').then((result) => {
      if (result) {
        firestore()
          .collection('Users')
          .where('Account', '==', result)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              tempUserInfos.push(doc.data());
            });
            this.setState({
              userImage: tempUserInfos[0]['Image'],
            });
          });
      }
    });
  }

  // show the medicine list
  open = () => {
    this.refs['myDrawer'].openDrawer();
  };

  // show the schedule in the order of time
  compare = (propertyName) => {
    return function (object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2.dbTime > value1.dbTime) {
        return -1;
      } else {
        return 0;
      }
    };
  };

  selectTime = (drugName) => {
    this.setState({
      timeWindow: true,
      drugName: drugName,
    });
  };

  timeConfirm = (drugName) => {
    this.setState({
      timeWindow: false,
    });
    this.submit(drugName);
  };

  submit = (drugName) => {
    var duplicateRecords = [];
    var matchedDrugs = [];

    firestore()
      .collection('Drugs')
      .where('Name', '==', drugName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          matchedDrugs.push(doc.data());
        });
        if (matchedDrugs.length == 0) {
          alert('No such drug exists!');
        } else if (matchedDrugs.length == 1) {
          firestore()
            .collection('ScheduleInfo')
            .where('Account', '==', this.state.currentUser)
            .where('DrugName', '==', drugName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                duplicateRecords.push(doc.data());
              });
              if (duplicateRecords.length != 0) {
                alert('Do not input duplicate records!');
              } else {
                if (drugName != '' && drugName != undefined) {
                  firestore()
                    .collection('ScheduleInfo')
                    .add({
                      Id: this.state.currentUser + '-' + drugName,
                      Account: this.state.currentUser,
                      DrugName: drugName,
                      Time: this.getTime(),
                    })
                    .then(function (docRef) {
                      console.log('New Schedule Added with ID: ', docRef.id);
                    })
                    .catch(function (error) {
                      console.error('Error adding document: ', error);
                    });

                  var tempDataUse = [];
                  var tempData = [];
                  firestore()
                    .collection('ScheduleInfo')
                    .orderBy('Time', 'asc')
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        tempData.push(doc.data());
                      });
                      for (var j = 0; j < tempData.length; j++) {
                        if (tempData[j]['Account'] == this.state.currentUser) {
                          tempDataUse.push(tempData[j]);
                        }
                      }
                      this.setState({
                        dbData: tempDataUse,
                      });
                      this.setState({
                        lastDrugName: drugName,
                      });
                    });
                  this.notif.scheduleNotif();
                  this.refs['myDrawer'].closeDrawer();
                }
              }
            });
        }
      });
  };

  // notification cancel functions
  cancelLastSchedule() {
    this.notif.cancelNotif();
    this.deleteSchedule(this.state.lastDrugName);
    var tempData = [];
    firestore()
      .collection('ScheduleInfo')
      .where('Account', '==', this.state.currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempData.push(doc.data());
        });

        this.setState({
          dbData: tempData,
        });
      });
  }

  cancelAllSchedules() {
    this.notif.cancelAll();
    firestore()
      .collection('ScheduleInfo')
      .where('Account', '==', this.state.currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          console.log(
            'Successfully deleted all schedules of ' + this.state.currentUser,
          );
        });

        var tempData = [];
        firestore()
          .collection('ScheduleInfo')
          .where('Account', '==', this.state.currentUser)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              tempData.push(doc.data());
            });

            this.setState({
              dbData: tempData,
            });
          });
      });
  }

  choiceAllSchedule() {
    Alert.alert(
      'Make Your Choice',
      'Are you sure to delete all schedule records and cancel all notifications?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.cancelAllSchedules()},
      ],
      {cancelable: false},
    );
  }

  choiceSchedule(drugName) {
    Alert.alert(
      'Make Your Choice',
      'Are you sure to delete this schedule record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.deleteSchedule(drugName)},
      ],
      {cancelable: false},
    );
  }

  // navigate to the medicine information page with drug name
  viewDetail(drugName) {
    this.props.navigation.navigate('mediInfo', {drugName: drugName});
  }

  deleteSchedule(drugName) {
    firestore()
      .collection('ScheduleInfo')
      .where('Account', '==', this.state.currentUser)
      .where('DrugName', '==', drugName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          // console.log('Successfully deleted ' + drugName);
        });
        this.getSchedule();
      });
  }

  getHourValue = (hour) => {
    this.setState({
      timeHour: hour,
    });
    console.log(hour);
  };

  getMinValue = (min) => {
    this.setState({
      timeMin: min,
    });
  };

  getTime() {
    var date = new Date(Date.now() + 21600 * 1000);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = this.state.timeHour;
    var minute = this.state.timeMin;
    var second = date.getSeconds();

    day = day > 10 ? day : '0' + day;
    hour = hour > 10 ? hour : '0' + hour;
    minute = minute > 10 ? minute : '0' + minute;
    second = second > 10 ? second : '0' + second;
    return (
      hour +
      ': ' +
      minute +
      ': ' +
      second +
      '   ' +
      day +
      ' / ' +
      month +
      ' / ' +
      year
    );
  }

  onChangeText1 = (text) => {
    this.setState({
      text,
      slist: this.filterText(text),
    });
  };

  filterText = (text) => {
    let data = this.state.originList;
    if (text) {
      return data.filter((v) => {
        return Object.keys(v).some((key) => {
          return String(v[key]).toLowerCase().includes(text);
        });
      });
    }
    return data;
  };



  render() {
    var navigationView = (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#46BEDB',
            elevation: 3,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}>
            <View style={{height: 22}}></View>
            <Text style={styles.headerText}>Add Medicine</Text>
          </LinearGradient>
        </View>

        <TextInput
          style={styles.input}
          placeholder="search"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(text) => this.onChangeText1(text)}
        />

        <View
          style={{
            paddingLeft: 15,
            marginHorizontal: 5,
          }}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  borderColor: '#eeeeee',
                  color: '#63738c',
                }}>
                Medicine List
              </Text>
              <ScrollView style={{marginBottom: 120}}>
                {this.state.slist.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                        paddingRight: 24,
                      }}
                      key={item.id}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#63738c',
                        }}>
                        {item.name}
                      </Text>
                      <TouchableHighlight
                        onPress={() => this.selectTime(item.name)}>
                        <Image
                          style={{height: 35, width: 35}}
                          source={require('../../assets/images/addBlue.png')}
                        />
                      </TouchableHighlight>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View></View>
        </View>
        <View
          style={{
            marginLeft: 25,
            marginRight: 25,
          }}></View>
        <View></View>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref="myDrawer"
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => navigationView}>
        {/* page header */}
        <View style={{backgroundColor: '#eee', elevation: 7}}>
          <View style={{height: 22, backgroundColor: '#46BEDB'}}></View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={styles.header}>
            <Text style={styles.headerText}>Medicine Schedule</Text>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('camera')}>
              <Image
                style={styles.imagesSize}
                source={require('../../assets/images/icon-awesome-camera.png')}
              />
            </TouchableHighlight>
          </LinearGradient>
        </View>

        {/* time select window */}
        <View style={styles.timeWindow}>
          <Dialog.Container visible={this.state.timeWindow}>
            <Dialog.Title>When would you take this?</Dialog.Title>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 10,
              }}>
              <Dialog.Description>hour</Dialog.Description>
              <Dialog.Input
                style={styles.timeInput}
                keyboardType="numeric"
                onChangeText={(hour) => this.getHourValue(hour)}></Dialog.Input>

              <Dialog.Description>minute</Dialog.Description>
              <Dialog.Input
                style={styles.timeInput}
                keyboardType="numeric"
                onChangeText={(min) => this.getMinValue(min)}></Dialog.Input>
            </View>
            <Dialog.Button
              style={{color: '#46BEDB'}}
              label="Confirm"
              onPress={() => this.timeConfirm(this.state.drugName)}
            />
          </Dialog.Container>
        </View>

        <View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}>
            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0)'}}>
              {/* user information container*/}
              <View style={{flex: 1}}>
                <View style={styles.userInformation}>
                  <Image
                    style={{height: 80, width: 80, borderRadius: 40}}
                    source={this.state.avatarSource}></Image>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.userInformationText}>
                      Hello, {this.state.currentUser}
                    </Text>
                  </View>
                </View>

                {/* add and delete notification buttons*/}

                <View
                  style={{
                    position: 'relative',
                    backgroundColor: '#eeeeee',
                    borderRadius: 22,
                  }}>
                  <View style={{}}>
                    <View style={[styles.buttonsContainer, {elevation: 3}]}>
                      <TouchableHighlight onPress={() => this.open()}>
                        <Image
                          style={{height: 35, width: 35}}
                          source={require('../../assets/images/addBlue.png')}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() => this.cancelLastSchedule()}>
                        <Image
                          style={{height: 35, width: 35}}
                          source={require('../../assets/images/cancelLast.png')}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() => this.choiceAllSchedule()}>
                        <Image
                          style={{height: 35, width: 35}}
                          source={require('../../assets/images/cancelAll.png')}
                        />
                      </TouchableHighlight>
                    </View>
                  </View>

                  {/* cards of schedule*/}
                  <View
                    style={{
                      paddingHorizontal: 12,
                      borderRadius: 22,
                      marginBottom: 80,
                    }}>
                    {this.state.dbData.map((item) => {
                      return (
                        <View style={styles.cardContainer} key={item.Id}>
                          <Text
                            style={{
                              marginHorizontal: 16,
                              marginVertical: 8,
                              fontSize: 20 + fontSize.fontSizePlus,
                              fontWeight: 'bold',
                              color: '#63738c',
                            }}>
                            {item.DrugName}
                          </Text>
                          <Text
                            style={{
                              marginHorizontal: 16,
                              marginVertical: 4,
                              fontSize: 16 + fontSize.fontSizePlus,
                              color: '#63738c',
                            }}>
                            {item.Time}
                          </Text>

                          {/* buttons in each card */}
                          <View
                            style={[
                              styles.buttonsContainer,
                              {
                                borderTopWidth: 1.5,
                                borderColor: '#d4d4d4',
                                marginHorizontal: 15,
                                paddingVertical: 8,
                                paddingHorizontal: 24,
                                justifyContent: 'space-between',
                              },
                            ]}>
                            <TouchableHighlight
                              onPress={() =>
                                this.choiceSchedule(item.DrugName)
                              }>
                              <Image
                                style={{height: 32, width: 32}}
                                source={require('../../assets/images/deleteBlue.png')}
                              />
                            </TouchableHighlight>

                            <TouchableHighlight
                              onPress={() => this.viewDetail(item.DrugName)}>
                              <Image
                                style={{height: 32, width: 32}}
                                source={require('../../assets/images/zoomInBlue.png')}
                              />
                            </TouchableHighlight>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0)"></StatusBar>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  // style of the drawer
  input: {
    margin: 15,
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
  },

  // style of the header navigation bar
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20 + fontSize.fontSizePlus,
    color: 'white',
  },

  imagesSize: {
    width: 30,
    height: 30,
  },

  // style of the user information
  userInformation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    paddingVertical: 24,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  userInformationText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flexGrow: 1,
  },

  // style of the cards
  cardContainer: {
    backgroundColor: '#ffffff',
    elevation: 3,
    marginBottom: 8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },

  // style of time window
  timeWindow: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInput: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    width: 80,
  },
});

AppRegistry.registerComponent('DrawerLayoutDemo', () => DrawerLayoutDemo);
