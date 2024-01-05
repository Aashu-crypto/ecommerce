import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <BottomTabNavigation />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
