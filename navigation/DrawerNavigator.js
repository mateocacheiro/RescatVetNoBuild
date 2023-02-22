import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import MapScreen from '../screens/MapScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import AboutTheAppScreen from '../screens/AboutTheAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import HomeStackNavigator from './HomeStackNavigator'
import ContactScreen from '../screens/ContactScreen';
import CustomDrawer from './CustomDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { screenActions } from '../store/screen-slice';

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({navigation}) => {

    const currentLanguage = useSelector(state => state.language.selectedLanguage)

    const currentScreen = useSelector(state => state.screen.currentScreen)

    const dispatch = useDispatch()

    useEffect(() => {
        
        renderNavigator()
    }, [])

    useEffect(() => {
        renderNavigator()
    }, [currentLanguage])

    const renderNavigator = () => {
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
                                dispatch(screenActions.changeCurrentScreen('Home'))
                                dispatch(screenActions.getInterfaceHelp(0))
                                dispatch(screenActions.hideInterfaceHelp())
                            }}>
                                <Image source={require('../assets/img/Logo.png')} style={{
                                    width: 50,
                                    resizeMode: 'contain',
                                    height: 50
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                // get the current screen and display the interface help
                                if (currentScreen === 'Home') {
                                    dispatch(screenActions.getInterfaceHelp(0))
                                }
                                else if (currentScreen === 'Emergency') {
                                    dispatch(screenActions.getInterfaceHelp(1))
                                }
                                else if (currentScreen === 'Map') {
                                    dispatch(screenActions.getInterfaceHelp(2))
                                }
                                else if (currentScreen === 'Contact') {
                                    dispatch(screenActions.getInterfaceHelp(3))
                                }
                                dispatch(screenActions.showInterfaceHelp())
                            }}>
                                <AntDesign name="questioncircleo" size={30} color="white" style={{paddingRight: 20}}/>
                            </TouchableOpacity>
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
                        drawerLabel: currentLanguage === 'ES' ? 'Inicio' : 'Home',
                        drawerLabelStyle: {
                            fontFamily: 'montserrat'
                        }
                    }}/>
                    <Drawer.Screen name="Map" component={MapScreen} options={{
                        drawerIcon: () => <MaterialIcons name="map" size={30} color='white' />,
                        drawerActiveBackgroundColor: 'green',
                        drawerInactiveTintColor: 'white',
                        drawerActiveTintColor: 'white',
                        drawerLabel: currentLanguage === 'ES' ? 'Mapa' : 'Map',
                        drawerLabelStyle: {
                            fontFamily: 'montserrat'
                        }
                    }}/>
                    <Drawer.Screen name="About Us" component={AboutUsScreen} options={{
                        drawerIcon: () => <MaterialIcons name="info" size={30} color='white' />,
                        drawerActiveBackgroundColor: 'green',
                        drawerInactiveTintColor: 'white',
                        drawerActiveTintColor: 'white',
                        drawerLabel: currentLanguage === 'ES' ? 'Sobre nosotros' : 'About us',
                        drawerLabelStyle: {
                            fontFamily: 'montserrat'
                        }
                    }}/>
                    <Drawer.Screen name="About The App" component={AboutTheAppScreen} options={{
                        drawerIcon: () => <MaterialIcons name="phone-android" size={30} color='white' />,
                        drawerActiveBackgroundColor: 'green',
                        drawerInactiveTintColor: 'white',
                        drawerActiveTintColor: 'white',
                        drawerLabel: currentLanguage === 'ES' ? 'Sobre la app' : 'About the app',
                        drawerLabelStyle: {
                            fontFamily: 'montserrat'
                        }
                    }}/>
                    <Drawer.Screen name="Contact" component={ContactScreen} options={{
                        drawerIcon: () => <MaterialIcons name="contact-page" size={30} color='white' />,
                        drawerActiveBackgroundColor: 'green',
                        drawerInactiveTintColor: 'white',
                        drawerActiveTintColor: 'white',
                        drawerLabel: currentLanguage === 'ES' ? 'Contacto' : 'Contact',
                        drawerLabelStyle: {
                            fontFamily: 'montserrat'
                        }
                    }}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
    return(
        renderNavigator()
    )
}

export default DrawerNavigator