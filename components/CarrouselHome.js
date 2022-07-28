import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {MaterialIcons} from '@expo/vector-icons'

const CarrouselHome = (props) => {

    const title = props.title
    const description = props.description
    const iconName = props.icon

  return (
    <View style={styles.card}>
        {title.includes("animal") && <TouchableOpacity style={{height: Dimensions.get('window').height*0.34, width: Dimensions.get('window').width*0.96, zIndex: 10, position: 'absolute'}} onPress={props.onNavigateToMap}/>}
        <View style={styles.header}>
            <MaterialIcons name={iconName} color={Colors.primary} size={50} />
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.divider}/>
        <Text style={styles.text}>{description}</Text>
    </View>
  )
}

export default CarrouselHome

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width*0.96,
        height: Dimensions.get('window').height * 0.34,
        marginLeft: Dimensions.get('window').width*0.02,
        marginRight: Dimensions.get('window').width*0.02,
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkBG,
        borderRadius: 7.5,
        elevation: 5,
        shadowOffset: {width: 0.8, height: 0.4},
        shadowColor: "#000",
        shadowOpacity: 0.8,
        paddingHorizontal: 5
    },
    text: {
        color: 'white',
        width: '95%',
        fontFamily: 'montserrat',
        fontSize: 13,
        textAlign: 'justify',
        marginVertical: 10
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 15,
        textAlign: 'center'
    },
    header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '30%',
    },
    divider: {
        width: '90%',
        height: 0.5,
        backgroundColor: '#aaa',
        marginTop: 15,
        marginBottom: 5
    },
})