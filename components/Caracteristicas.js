import React from 'react'
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { searchActions } from '../store/search-slice'

const Caracteristicas = () => {

    const dispatch = useDispatch()

    const chars = useSelector(state => state.search.caracteristicas)

    return (
        <ScrollView horizontal={true}>
            {
                chars.map((char) => 
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => {
                            dispatch(searchActions.toggleSelectedChar(char))
                        }}><FontAwesome name="close" size={20} color='white'/></TouchableOpacity>
                        <Text style={styles.title}>{char}</Text>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default Caracteristicas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        height: 35,
        marginRight: 10,
        marginTop: 10,
        paddingHorizontal: 10
    },
    title: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white',
        marginLeft: 5
    }
})
