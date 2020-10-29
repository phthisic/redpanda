import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

export default class mediInfo extends Component {
  constructor() {
   
    super();
    this.state = {
      // basic medicine info
      mediName: '',
      mediCompany: '',
      mediImages: ['none', 'none'],
      organ: 'none',
      // amount to take
      mediAmount: '0',
      mediTimes: '0',
      // warning image and text
      warnings: ['none'],
      warningsText: ['none'],
      // side effect image and text
      sideEffects: ['none'],
      sideEffectsText: [''],
    };
  }

  componentDidMount() {
    this.getMediInfo();
  }

  // get medicine information. is called before rendering
  getMediInfo() {
    var drugName = this.props.navigation.state.params.drugName;
    var tempData = [];
    firestore()
      .collection('Drugs')
      .where('Name', '==', drugName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempData.push(doc.data());
        });
        this.setState({
          mediImages: tempData[0]['Image'],
        });
        this.setState({
          organ: tempData[0]['Organ'],
        });
        this.setState({
          mediDescription: tempData[0]['Description'],
        });
        this.setState({
          mediType: tempData[0]['Type'],
        });
        this.setState({
          mediName: drugName,
        });
        this.setState({
          mediAmount: tempData[0]['Dosage'],
        });
        this.setState({
          mediCompany: tempData[0]['Company'],
        });
        this.setState({
          warnings: tempData[0]['Warning'],
        });
        this.setState({
          warningsText: tempData[0]['WarningText'],
        });
        this.setState({
          sideEffects: tempData[0]['SideEffect'],
        });
        this.setState({
          sideEffectsText: tempData[0]['SideEffectText'],
        });
      });
  }

  // change the unit of medicine amount
  getMediType() {
    if (this.state.mediType == 1) {
      return <Text>tablet(s)</Text>;
    } else if (this.state.mediType == 2) {
      return <Text>g</Text>;
    } else if (this.state.mediType == 3) {
      return <Text>ml</Text>;
    }
  }

  render() {
    // render the image and text list for warning
    let warningPic = this.state.warnings.map((r, i) => {
      return (
        <View style={styles.container} key={i}>
          <View style={styles.picText}>
            <Image
              style={styles.picture}
              source={{uri: this.state.warnings[i]}}></Image>
            <Text style={{fontSize:16+fontSize.fontSizePlus}}>{this.state.warningsText[i]}</Text>
          </View>
        </View>
      );
    });

    // render the image and text list for side effect
    let sideEffectPic = this.state.sideEffects.map((r, i) => {
      return (
        <View style={styles.container} key={i}>
          <View style={styles.picText}>
            <Image
              style={styles.picture}
              source={{uri: this.state.sideEffects[i]}}></Image>
            <Text style={{fontSize:16+fontSize.fontSizePlus}}>{this.state.sideEffectsText[i]}</Text>
          </View>
        </View>
      );
    });

    return (
      <>
        <StatusBar
          hidden={false}
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0)"></StatusBar>
        {/* page header */}
        <View style={{backgroundColor: '#eee', elevation: 7}}>
          <View style={{height: 22, backgroundColor: '#46BEDB'}}></View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#46BEDB', '#50DDE3']}
            style={styles.header}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('schedule')}>
              <Image
                style={styles.imagesSize}
                source={require('../../assets/images/backArrowWhite.png')}
              />
            </TouchableHighlight>
            <Text style={styles.headerText}>Medicine Information</Text>
          </LinearGradient>
        </View>

        <ScrollView>
          {/* bisic information */}
          <View style={[styles.card, styles.cardOne]}>
            <View style={styles.mediInfo}>
              <View>
                <Text style={[styles.mediName,{fontSize: 24+fontSize.fontSizePlus,}]}>{this.state.mediName}</Text>
                <Text style={[styles.mediCompany,{fontSize: 16+fontSize.fontSizePlus,}]}>{this.state.mediCompany}</Text>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <Image
                style={styles.picture}
                source={{uri: this.state.mediImages[0]}}></Image>
              <Image
                style={styles.picture}
                source={{uri: this.state.mediImages[1]}}></Image>
            </View>
            {/* brief information */}
            <Text style={[styles.title,{fontSize:16+fontSize.fontSizePlus}]}>{this.state.mediDescription}</Text>
          </View>

          {/* amount to take */}
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.cardHalf]}>
              <Text style={[styles.title,{fontSize:16+fontSize.fontSizePlus}]}>Amount to take</Text>
              {
                <View
                  style={[
                    styles.amountContainer,
                    {
                      flex: 1,
                      alignItems: 'center',
                      marginBottom: 40,
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 32,
                      marginHorizontal: 12,
                      color: '#46BEDB',
                    }}>
                    {this.state.mediAmount}
                  </Text>
                  {this.getMediType()}
                </View>
              }
            </View>

            {/* effect */}
            <View style={[styles.card, styles.cardHalf]}>
              <Text style={[styles.title,{fontSize:16+fontSize.fontSizePlus}]}>Effect</Text>
              <Image
                style={styles.humanPic}
                source={{uri: this.state.organ}}></Image>
            </View>
          </View>

          {/* warning */}
          <View style={[styles.card, styles.cardOne]}>
            <Text style={[styles.title,{fontSize:16+fontSize.fontSizePlus}]}>Warning</Text>
            <View style={styles.container}>{warningPic}</View>
          </View>

          {/* side effect */}
          <View style={[styles.card, styles.cardOne, {marginBottom: 12}]}>
            <Text style={[styles.title,{fontSize:16+fontSize.fontSizePlus}]}>Side effect</Text>
            <View style={styles.container}>{sideEffectPic}</View>
          </View>
        </ScrollView>
      </>
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
    color: 'white',
    fontSize: 20
  },
  imagesSize: {
    width: 30,
    height: 30,
    marginRight: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediName: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: '#63738c',
  },
  mediCompany: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardOne: {
    width: '96%',
    marginLeft: '2%',
    marginTop: '2%',
  },
  cardHalf: {
    width: '47%',
    marginLeft: '2%',
    marginTop: '2%',
  },
  mediInfo: {
    flexDirection: 'row',
  },
  title: {
    color: '#333',
    padding: 10,
  },
  picture: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    margin: 12,
    borderRadius: 8,
    backgroundColor: '#50DDE3',
  },
  humanPic: {
    width: 80,
    alignSelf: 'center',
    margin: 12,
    height: 200,
  },
  container: {
    flexDirection: 'row',
    marginLeft: '1%',
    paddingBottom: 12,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  amountContainer: {
    flexDirection: 'row',
    marginLeft: '5%',
    paddingBottom: 12,
  },
  picText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
