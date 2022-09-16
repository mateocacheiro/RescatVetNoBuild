import React from 'react'
import { StyleSheet, View, TouchableOpacity, Linking, Text, Dimensions } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const ResourceItem = props => {

    const title = props.title
    const name = props.name

    return(
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={props.onLink}>
            <View style={{flexDirection: 'column'}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>{title}</Text>
            </View>
            <MaterialIcons name="open-in-new" size={30} color="white" />
        </TouchableOpacity>
    )
}

export default ResourceItem

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width*0.9,
        minHeight: Dimensions.get('window').height * 0.1,
        paddingVertical: 10,
        paddingRight: 20,
        borderRadius: 5,
        backgroundColor: Colors.lightBG,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginVertical: 5,
        maxWidth: Dimensions.get('window').width*0.6,
        textAlign: 'left',
        marginLeft: Dimensions.get('window').width * 0.05
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 16,
        marginLeft: Dimensions.get('window').width * 0.05
    }
})

