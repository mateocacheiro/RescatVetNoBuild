import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'

const AnimalItem = props => {
    const name = props.name.charAt(0).toUpperCase() + props.name.slice(1)
    return (
        <TouchableOpacity style={styles.container} onPress={props.onNavigate}>
            <View>
                {props.id === 1 && <Image source={require('../assets/img/1.jpg')} style={styles.image} />}
                {props.id === 2 && <Image source={require('../assets/img/2.jpg')} style={styles.image} />}
                {props.id === 3 && <Image source={require('../assets/img/3.jpg')} style={styles.image} />}
                {props.id === 4 && <Image source={require('../assets/img/4.jpg')} style={styles.image} />}
                {props.id === 5 && <Image source={require('../assets/img/5.jpg')} style={styles.image} />}
                {props.id === 6 && <Image source={require('../assets/img/6.jpg')} style={styles.image} />}
                {props.id === 7 && <Image source={require('../assets/img/7.jpg')} style={styles.image} />}
                {props.id === 8 && <Image source={require('../assets/img/8.jpg')} style={styles.image} />}
            </View>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

export default AnimalItem

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    image: {
        width: Dimensions.get('window').height*0.23,
        height: Dimensions.get('window').width*0.3,
        borderRadius: 5
    },
    text: {
        position: 'relative',
        bottom: 23,
        color: 'white',
        fontSize: 15,
        fontFamily: 'montserrat-bold'
    }
})