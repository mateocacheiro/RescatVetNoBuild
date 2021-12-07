import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'

const d_width = Dimensions.get('window').width

const C_Button = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onHandlePress}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default C_Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        borderWidth: 1,
        padding: 10,
        width: d_width*0.5,
        borderRadius: 5,
        marginBottom: 20
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})