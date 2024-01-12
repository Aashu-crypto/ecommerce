import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Navigator} from './navigation/RootStackScreen';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PaperProvider>
            <BottomTabNavigation />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
