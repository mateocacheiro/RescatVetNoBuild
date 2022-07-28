import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import Colors from '../constants/Colors'


const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/Logo.png')} width={200} height={200}/>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBG,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
