import React from 'react'
import { Dimensions, StyleSheet,View } from 'react-native'

// icon - title - description

const Card = props => {
    return (
        <View style={styles.container}>{props.children}</View>
    )
}

export default Card

const d_width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginTop: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
        width: d_width*0.955,
        borderRadius: 5,
        elevation: 10,
        zIndex: 0
    }
})