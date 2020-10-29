import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import {AsyncStorage} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

export default class healthdata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      bloodPressureOne: 0,
      bloodPressureTwo: 0,
      bloodPressureThree: 0,
      bloodPressureFour: 0,
      bloodPressureFive: 0,
      bloodPressureSix: 0,
      bloodSugarOne: 0,
      bloodSugarTwo: 0,
      bloodSugarThree: 0,
      bloodSugarFour: 0,
      bloodSugarFive: 0,
      bloodSugarSix: 0,
      oxygenSatOne: 0,
      oxygenSatTwo: 0,
      oxygenSatThree: 0,
      oxygenSatFour: 0,
      oxygenSatFive: 0,
      oxygenSatSix: 0,
      temperatureOne: 0,
      temperatureTwo: 0,
      temperatureThree: 0,
      temperatureFour: 0,
      temperatureFive: 0,
      temperatureSix: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser').then((result) => {
      if (result) {
        this.setState({
          currentUser: result,
        });
      }
    });
    this.getHealthData();
  }

  getHealthData() {
    var tempRecords = [];
    var wantRecords = [];
    var pressures = [];
    var sugars = [];
    var oxygenSats = [];
    var temperatures = [];

    firestore()
      .collection('HealthData')
      .orderBy('Date', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tempRecords.push(doc.data());
        });
        for (var j = 0; j < tempRecords.length; j++) {
          if (tempRecords[j]['Account'] == this.state.currentUser) {
            wantRecords.push(tempRecords[j]);
          }
        }
        for (var i = 0; i < 6; i++) {
          if (i < tempRecords.length) {
            pressures.push(wantRecords[i]['Pressure']);
            sugars.push(wantRecords[i]['Sugar']);
            oxygenSats.push(wantRecords[i]['OxygenSat']);
            temperatures.push(wantRecords[i]['Temperature']);
          }
        }

        this.setState({
          bloodPressureOne: pressures[5],
        });
        this.setState({
          bloodPressureTwo: pressures[4],
        });
        this.setState({
          bloodPressureThree: pressures[3],
        });
        this.setState({
          bloodPressureFour: pressures[2],
        });
        this.setState({
          bloodPressureFive: pressures[1],
        });
        this.setState({
          bloodPressureSix: pressures[0],
        });

        this.setState({
          bloodSugarOne: sugars[5],
        });
        this.setState({
          bloodSugarTwo: sugars[4],
        });
        this.setState({
          bloodSugarThree: sugars[3],
        });
        this.setState({
          bloodSugarFour: sugars[2],
        });
        this.setState({
          bloodSugarFive: sugars[1],
        });
        this.setState({
          bloodSugarSix: sugars[0],
        });

        this.setState({
          oxygenSatOne: oxygenSats[5],
        });
        this.setState({
          oxygenSatTwo: oxygenSats[4],
        });
        this.setState({
          oxygenSatThree: oxygenSats[3],
        });
        this.setState({
          oxygenSatFour: oxygenSats[2],
        });
        this.setState({
          oxygenSatFive: oxygenSats[1],
        });
        this.setState({
          oxygenSatSix: oxygenSats[0],
        });

        this.setState({
          temperatureOne: temperatures[5],
        });
        this.setState({
          temperatureTwo: temperatures[4],
        });
        this.setState({
          temperatureThree: temperatures[3],
        });
        this.setState({
          temperatureFour: temperatures[2],
        });
        this.setState({
          temperatureFive: temperatures[1],
        });
        this.setState({
          temperatureSix: temperatures[0],
        });
      });
  }

  toInputHealthData() {
    this.props.navigation.navigate('inputHealthData', {
      refresh: () => {
        this.refresh();
      },
    });
  }

  refreshfont(){
    console.log("refresh font")
  }

  refresh() {
    this.getHealthData();
  }

  render() {
    return (
      <View>
        <SafeAreaView>
          {/* 顶部导航 page header */}
          <View style={{backgroundColor: '#eee', elevation: 7}}>
            <View style={{height: 22, backgroundColor: '#46BEDB'}}></View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#46BEDB', '#50DDE3']}
              style={styles.header}>
              <Text style={styles.headerText}>Health Data</Text>
              <TouchableHighlight onPress={() => this.toInputHealthData()}>
                <Image
                  style={styles.imagesSize}
                  source={require('../assets/images/addWhiteBlue.png')}
                />
              </TouchableHighlight>
            </LinearGradient>
          </View>

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <View style={styles.sectionInfo}>
                  <Image
                    style={styles.portrait}
                    source={require('../assets/images/bloodPressure.png')}></Image>
                  <View style={styles.mainInfo}>
                    <Text style={styles.chartText}>Blood Pressure</Text>
                    <View>
                      <BarChart
                        data={{
                          labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                          ],
                          datasets: [
                            {
                              data: [
                                this.state.bloodPressureOne,
                                this.state.bloodPressureTwo,
                                this.state.bloodPressureThree,
                                this.state.bloodPressureFour,
                                this.state.bloodPressureFive,
                                this.state.bloodPressureSix,
                              ],
                            },
                          ],
                        }}
                        width={270}
                        height={170}
                        withVerticalLabels={false}
                        chartConfig={{
                          backgroundColor: '#e26a00',
                          backgroundGradientFrom: 'white',
                          backgroundGradientTo: 'white',
                          decimalPlaces: 0,
                          color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: 'black',
                          },
                        }}
                        bezier
                        style={{
                          marginVertical: 6,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.sectionInfo}>
                  <Image
                    style={styles.portrait}
                    source={require('../assets/images/bloodSugar.png')}></Image>
                  <View style={styles.mainInfo}>
                    <Text style={styles.chartText}>Blood Sugar</Text>
                    <View>
                      <LineChart
                        data={{
                          labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                          ],
                          datasets: [
                            {
                              data: [
                                this.state.bloodSugarOne,
                                this.state.bloodSugarTwo,
                                this.state.bloodSugarThree,
                                this.state.bloodSugarFour,
                                this.state.bloodSugarFive,
                                this.state.bloodSugarSix,
                              ],
                            },
                          ],
                        }}
                        width={270}
                        height={170}
                        withVerticalLabels={false}
                        chartConfig={{
                          backgroundColor: '#e26a00',
                          backgroundGradientFrom: 'white',
                          backgroundGradientTo: 'white',
                          decimalPlaces: 0,
                          color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: 'black',
                          },
                        }}
                        bezier
                        style={{
                          marginVertical: 6,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.sectionInfo}>
                  <Image
                    style={styles.portrait}
                    source={require('../assets/images/oxygenSaturationLevel.png')}></Image>
                  <View style={styles.mainInfo}>
                    <Text style={styles.chartText}>
                      Oxygen Saturation level
                    </Text>
                    <View>
                      <LineChart
                        data={{
                          labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                          ],
                          datasets: [
                            {
                              data: [
                                this.state.oxygenSatOne / 100,
                                this.state.oxygenSatTwo / 100,
                                this.state.oxygenSatThree / 100,
                                this.state.oxygenSatFour / 100,
                                this.state.oxygenSatFive / 100,
                                this.state.oxygenSatSix / 100,
                              ],
                            },
                          ],
                        }}
                        width={270}
                        height={170}
                        withVerticalLabels={false}
                        chartConfig={{
                          backgroundColor: '#e26a00',
                          backgroundGradientFrom: 'white',
                          backgroundGradientTo: 'white',
                          decimalPlaces: 0,
                          color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: 'black',
                          },
                        }}
                        bezier
                        style={{
                          marginVertical: 6,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.sectionInfo}>
                  <Image
                    style={styles.portrait}
                    source={require('../assets/images/bodyTemperature.png')}></Image>
                  <View style={styles.mainInfo}>
                    <Text style={styles.chartText}>Body Temperature</Text>
                    <View>
                      <LineChart
                        data={{
                          labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                          ],
                          datasets: [
                            {
                              data: [
                                this.state.temperatureOne,
                                this.state.temperatureTwo,
                                this.state.temperatureThree,
                                this.state.temperatureFour,
                                this.state.temperatureFive,
                                this.state.temperatureSix,
                              ],
                            },
                          ],
                        }}
                        width={270}
                        height={170}
                        withVerticalLabels={false}
                        chartConfig={{
                          backgroundColor: '#e26a00',
                          backgroundGradientFrom: 'white',
                          backgroundGradientTo: 'white',
                          decimalPlaces: 0,
                          color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: 'black',
                          },
                        }}
                        bezier
                        style={{
                          marginVertical: 6,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 120}}></View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
  imagesSize: {
    width: 30,
    height: 30,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  sectionInfo: {
    margin: 20,
    backgroundColor: 'white',
    width: 380,
    height: 240,
    elevation: 5,
    flexDirection: 'row',
  },
  portrait: {
    width: 50,
    height: 50,
    margin: 10,
  },
  mainInfo: {
    margin: 10,
    width: 270,
    height: 220,
  },
  chartText: {
    fontWeight: 'bold',
    color: '#63738c',
    fontSize:24
  },
});
