import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import AnimalsData from '../assets/database/Animals.json'

const AnimalEmergencyScreen = () => {

    const animalID = useSelector(state => state.search.animalSelected_id)

    const animalSelected = AnimalsData.filter(animal => animal.ID === animalID)[0]

    console.log(animalSelected)

    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Emergency Screen for {animalSelected.Name}</Text>
        </View>
    )
}

export default AnimalEmergencyScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
