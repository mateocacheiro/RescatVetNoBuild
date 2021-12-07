import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AnimalTabNavigator from './AnimalTabNavigator';
import React from 'react'
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AnimalScreenStack" component={AnimalTabNavigator} />
      <Stack.Screen name="MapScreenStack" component={MapScreen} />
    </Stack.Navigator>
  );
}

export default MyStack