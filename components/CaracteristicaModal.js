import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../store/search-slice'
import C_Button from './C_Button'

const CaracteristicaModal = () => {

    const dispatch = useDispatch()

    const caracteristicas_1 = ['plumaje', 'gris', 'verde', 'peludo', 'felino', 'oscuro']

    const caracteristicas_2 = ['pequeño', 'alargado', 'canino', 'herviboro', 'caparazon', 'duro']

    const selectedChars = useSelector(state => state.search.caracteristicas)

    const modalCaracteristicaVisible = useSelector(state => state.search.modals.caracteristica_modal_visible)

    useEffect(() => {
        console.log(selectedChars)
    }, [selectedChars])

    return (
            <Modal animationType='fade' transparent={true} visible={modalCaracteristicaVisible}>
                <View style={styles.modal}>
                    <View style={styles.inner}>
                        <ScrollView style={styles.charContainer}>
                            <View style={styles.charFlex}>
                                <View style={styles.charFlex_left}>
                                    {
                                        caracteristicas_1.map((char, index={char}) => 
                                            <TouchableOpacity style={{
                                                backgroundColor: selectedChars.includes(char) ? 'green' : 'rgba(0,0,0,0)',
                                                padding: 5,
                                                borderColor: 'green',
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                padding: 10,
                                                marginVertical: 10,
                                            }} onPress={() => {
                                                dispatch(searchActions.toggleSelectedChar(char))
                                            }}>
                                                <Text style={styles.text}>{char}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                                <View style={styles.charFlex_right}>
                                    {
                                        caracteristicas_2.map((char) => 
                                            <TouchableOpacity style={{
                                                backgroundColor: selectedChars.includes(char) ? 'green' : 'rgba(0,0,0,0)',
                                                padding: 5,
                                                borderColor: 'green',
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                padding: 10,
                                                marginVertical: 10,
                                            }} onPress={() => {
                                                dispatch(searchActions.toggleSelectedChar(char))
                                            }}>
                                                <Text style={styles.text}>{char}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        <C_Button title="OK" onHandlePress={() => {
                            dispatch(searchActions.toggleModal(2))
                            console.log(modalCaracteristicaVisible)
                        }}/>
                    </View>
                </View>
            </Modal>
    )
}

export default CaracteristicaModal

const d_width = Dimensions.get('window').width

const d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#222',
        width: d_width*0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        marginVertical: 10
    },
    charContainer: {
        width: '100%',
    },
    charFlex: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 5
    },
    charFlex_left: {
        flexDirection: 'column'
    },
    charFlex_right: {
        flexDirection: 'column'
    },
    charBox: {
        padding: 5,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    }
})
