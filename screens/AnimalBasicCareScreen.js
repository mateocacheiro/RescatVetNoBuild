import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AnimalBasicCareScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Basic Care Screen</Text>
        </View>
    )
}

export default AnimalBasicCareScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
