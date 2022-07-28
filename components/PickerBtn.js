import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const d_width = Dimensions.get('screen').width
const d_height = Dimensions.get('screen').height

const PickerBtn = props => {
    return (
        <View style={{height: 60, width: '100%'}}>
            <TouchableOpacity style={[props.style, styles.container]} onPress={props.onSelect}>
                <Text style={styles.text}>{props.title}</Text>
                <AntDesign name="down" size={20} color="green" />
            </TouchableOpacity>
        </View>
    )
}

export default PickerBtn

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },
    text: {
        fontFamily: 'montserrat',
        color: '#ccc'
    }
})