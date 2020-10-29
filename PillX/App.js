/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Global from './pages/globalText';
import React from 'react';
import {StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppContainer from './navigator/AppNav';

const App: () => React$Node = () => {
  return (
    <>
    <StatusBar barStyle='dark-content' backgroundColor='white'></StatusBar>
    <AppContainer>
      
    </AppContainer>
    
    </>
  );
};

export default App;
