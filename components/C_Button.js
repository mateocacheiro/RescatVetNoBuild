import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'

const d_width = Dimensions.get('window').width

const C_Button = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onHandlePress}>
            <Text style={[props.style, styles.title]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default C_Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
})