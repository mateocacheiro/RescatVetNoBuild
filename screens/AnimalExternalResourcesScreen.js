import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AnimalExternalResourcesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>External Resources Screen</Text>
        </View>
    )
}

export default AnimalExternalResourcesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
