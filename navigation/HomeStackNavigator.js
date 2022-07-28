import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen_v2 from '../screens/HomeScreen_v2';
import AnimalTabNavigator from './AnimalTabNavigator';
import React from 'react'
import MapScreen from '../screens/MapScreen';
import AnimalBasicCareScreen from '../screens/AnimalBasicCareScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen_v2} />
      <Stack.Screen name="AnimalScreenStack" component={AnimalTabNavigator} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="BasicCareScreen" component={AnimalBasicCareScreen} />
    </Stack.Navigator>
  );
}

export default MyStack