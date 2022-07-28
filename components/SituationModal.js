import { StyleSheet, Text, View, Dimensions, Modal, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { searchActions } from '../store/search-slice'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'

const SituationModal = () => {
    const modalVisible = useSelector(state => state.search.modals.situation_modal_visible)

    const situation = useSelector(state => state.search.situation_selected)

    const dispatch = useDispatch()
  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <Pressable style={styles.modal} onPress={() => {dispatch(searchActions.toggleModal(4))}}>
            <View style={styles.inner}>
                <View>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(searchActions.situationSelected(''))
                            dispatch(searchActions.toggleModal(4))
                        }}>
                        <Text style={styles.text}>Deseleccionar</Text>
                        {situation === '' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {situation !== '' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(searchActions.situationSelected('Atropello'))
                            dispatch(searchActions.toggleModal(4))
                        }}>
                        <Text style={styles.text}>Atropello</Text>
                        {situation === 'Atropello' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {situation !== 'Atropello' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(searchActions.situationSelected('Envenenamiento'))
                            dispatch(searchActions.toggleModal(4))
                        }}>
                        <Text style={styles.text}>Envenenamiento</Text>
                        {situation === 'Envenenamiento' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {situation !== 'Envenenamiento' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(searchActions.situationSelected('Ahogamiento'))
                            dispatch(searchActions.toggleModal(4))
                        }}>
                        <Text style={styles.text}>Ahogamiento</Text>
                        {situation === 'Ahogamiento' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {situation !== 'Ahogamiento' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                </View>  
            </View>
        </Pressable>
    </Modal>
  )
}

export default SituationModal

const d_height = Dimensions.get('window').height
const d_width = Dimensions.get('window').width

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white'
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
        width: d_width*0.7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 20
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        marginVertical: 10
    },
    
})