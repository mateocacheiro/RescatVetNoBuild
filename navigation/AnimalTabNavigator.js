import React from 'react';
import { Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimalEmergencyScreen from '../screens/AnimalEmergencyScreen';
import AnimalBasicCareScreen from '../screens/AnimalBasicCareScreen';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import AnimalExternalResourcesScreen from '../screens/AnimalExternalResourcesScreen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

/*
tabBarActiveTintColor: 'white',
        
*/

const d_height = Dimensions.get('window').height

const AnimalTabNavigator = ({ navigation }) => {

    const currentLanguage = useSelector(state => state.language.selectedLanguage)

  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconColor
            let iconName
            let iconSize
            if(route.name === 'Emergency') {
                iconName = 'local-hospital'
                iconColor = focused ? Colors.primary : 'white'
                iconSize = focused ? 35 : 30
                return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
            } else if (route.name === 'BasicCare') {
                iconName = 'paw'
                iconColor = focused ? Colors.primary : 'white'
                iconSize = focused ? 35 : 30
                return <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
            } else if (route.name === 'ExternalResources') {
                iconName = 'launch'
                iconColor = focused ? Colors.primary : 'white'
                iconSize = focused ? 35 : 30
                return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
            }
        },
        headerShown: false,
        tabBarStyle: {
            borderTopColor: 'transparent',
            borderTopWidth: 0,
            height: d_height*0.08,
        }
    })}>
      <Tab.Screen name="Emergency" component={AnimalEmergencyScreen} options={{
          tabBarLabel: currentLanguage == 'ES' ? 'Emergencias' : 'Emergency',
          //tabBarIcon: () => <MaterialIcons name="local-hospital" size={30} />,
          tabBarActiveBackgroundColor: '#111',
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: '#111',
          tabBarLabelStyle: {
              paddingBottom: 5
          }
      }}/>
      <Tab.Screen name="BasicCare" component={AnimalBasicCareScreen} options={{
          tabBarLabel: currentLanguage == 'ES' ? 'CUidados básicos' : 'Primary Care',
          //tabBarIcon: () => <MaterialCommunityIcons name="paw" size={30} color={useIsFocused ? 'green' : 'white'} />,
          tabBarActiveBackgroundColor: '#111',
          tabBarInactiveBackgroundColor: '#111',
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
              paddingBottom: 5
          }
      }}/>
      <Tab.Screen name="ExternalResources" component={AnimalExternalResourcesScreen} options={{
          tabBarLabel: currentLanguage == 'ES' ? 'Recursos externos' : 'External Resources',
          //tabBarIcon: () => <MaterialIcons name="launch" size={30} color={useIsFocused ? 'green' : 'white'} />,
          tabBarActiveBackgroundColor: '#111',
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: '#111',
          tabBarLabelStyle: {
              paddingBottom: 5
          }
      }}/>
    </Tab.Navigator>
  );
}

export default AnimalTabNavigator