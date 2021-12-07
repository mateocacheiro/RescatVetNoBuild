import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{color: '#fff', marginVertical: 30, fontFamily: 'montserrat'}}>Contact Screen</Text>
        </View>
    )
}

export default ContactScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBG,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
