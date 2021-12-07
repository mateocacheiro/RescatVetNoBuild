import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const MapScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{color: '#fff', marginVertical: 30}}>Map Screen</Text>
            <Button title="Go Home" onPress={() => {
                navigation.navigate('Home')
            }} />
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
