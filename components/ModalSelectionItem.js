import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useSelector} from 'react-redux'

const ModalSelectionItem = (props) => {

    const name = props.name

    const id = props.id

    const situation = useSelector(state => state.search.situation_selected)

  return (
    <TouchableOpacity style={styles.container} onPress={props.onSituationSelected}>
      <Text style={styles.text}>{name}</Text>
      <MaterialCommunityIcons name={situation ? "circle-slice-8" : "circle-outline"} size={25} color={Colors.primary} />
    </TouchableOpacity>
  )
}

export default ModalSelectionItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 15
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 14
    }
})