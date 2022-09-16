import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import LoadingScreen from './screens/LoadingScreen';
import store from './store/App';
import Colors from './constants/Colors';

export default function App() {

  let [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  })

  if(!fontsLoaded) {
    return <LoadingScreen />
  }

  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
