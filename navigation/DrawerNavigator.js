import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import MapScreen from '../screens/MapScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import AboutTheAppScreen from '../screens/AboutTheAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import HomeStackNavigator from './HomeStackNavigator'
import ContactScreen from '../screens/ContactScreen';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({navigation}) => {
    return(
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={({navigation}) => ({
                 headerStyle: {
                     backgroundColor: Colors.darkBG,
                     height: Dimensions.get('window').height*0.13
                 },
                 headerTitle: '',
                 headerLeft: () => 
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: Dimensions.get('window').width
                    }}>
                        <AntDesign name="menuunfold" size={30} color="white" style={{paddingLeft: 20}} onPress={() => {navigation.toggleDrawer()}}/>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Home')
                        }}>
                            <Image source={require('../assets/img/Logo.png')} style={{
                                width: 50,
                                resizeMode: 'contain',
                                height: 50
                            }}/>
                        </TouchableOpacity>
                        <AntDesign name="questioncircleo" size={30} color="white" style={{paddingRight: 20}}/>
                    </View>,
                 drawerContentContainerStyle: {
                     backgroundColor: '#222',
                     height: '100%'
                 }
            })}>
                <Drawer.Screen name="HomeDrawerScreen" component={HomeStackNavigator} options={{
                    drawerIcon: () => <MaterialIcons name="home" size={30} color="white" />,
                    drawerActiveBackgroundColor: 'green',
                    drawerInactiveTintColor: 'white',
                    drawerActiveTintColor: 'white',
                    drawerLabel: 'Home',
                    drawerLabelStyle: {
                        fontFamily: 'montserrat'
                    }
                }}/>
                <Drawer.Screen name="Map" component={MapScreen} options={{
                    drawerIcon: () => <MaterialIcons name="map" size={30} color='white' />,
                    drawerActiveBackgroundColor: 'green',
                    drawerInactiveTintColor: 'white',
                    drawerActiveTintColor: 'white',
                    drawerLabelStyle: {
                        fontFamily: 'montserrat'
                    }
                }}/>
                <Drawer.Screen name="About Us" component={AboutUsScreen} options={{
                    drawerIcon: () => <MaterialIcons name="info" size={30} color='white' />,
                    drawerActiveBackgroundColor: 'green',
                    drawerInactiveTintColor: 'white',
                    drawerActiveTintColor: 'white',
                    drawerLabelStyle: {
                        fontFamily: 'montserrat'
                    }
                }}/>
                <Drawer.Screen name="About The App" component={AboutTheAppScreen} options={{
                    drawerIcon: () => <MaterialIcons name="phone-android" size={30} color='white' />,
                    drawerActiveBackgroundColor: 'green',
                    drawerInactiveTintColor: 'white',
                    drawerActiveTintColor: 'white',
                    drawerLabelStyle: {
                        fontFamily: 'montserrat'
                    }
                }}/>
                <Drawer.Screen name="Contact" component={ContactScreen} options={{
                    drawerIcon: () => <MaterialIcons name="contact-page" size={30} color='white' />,
                    drawerActiveBackgroundColor: 'green',
                    drawerInactiveTintColor: 'white',
                    drawerActiveTintColor: 'white',
                    drawerLabelStyle: {
                        fontFamily: 'montserrat'
                    }
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigator