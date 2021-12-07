import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

const AboutTheAppScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'montserrat', color: '#fff'}}>About The App Screen</Text>
        </View>
    )
}

export default AboutTheAppScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBG,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
