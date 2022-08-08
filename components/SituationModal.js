import { StyleSheet, Text, View, Dimensions, Modal, Pressable, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { searchActions } from '../store/search-slice'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import Situations from '../assets/database/Situations.json'
import ModalSelectionItem from './ModalSelectionItem'
import { emergencyActions } from '../store/emergency-slice'
import PickerBtn from '../components/PickerBtn'

const SituationModal = () => {
    const modalVisible = useSelector(state => state.emergency.situation_modal_visible)

    const situation = useSelector(state => state.search.situation_selected)

    const animal_selected = useSelector(state => state.search.animalSelected_id)

    const currentLanguage = useSelector(state => state.language.selectedLenguage)

    const [selectionItemsVisible, setSelectionItemsVisible] = useState(false)

    const dispatch = useDispatch()

    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
                style={{backgroundColor: "#222"}}
            />
        )
    }

    useEffect(() => {
        console.log(currentLanguage)
    }, [currentLanguage])

  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <Pressable style={styles.modal}>
            <View style={styles.inner}>
                {selectionItemsVisible && <View>
                    <TouchableOpacity style={styles.back} onPress={() => {
                        setSelectionItemsVisible(false)
                    }}><MaterialCommunityIcons name="keyboard-backspace" color="#fff" size={30}/></TouchableOpacity>
                    <VirtualizedList>
                        <FlatList data={Situations}
                        style={{marginVertical: 10}}
                        scrollEnabled={true} 
                        keyExtractor={animal => animal.ID} 
                        renderItem={itemData => {
                            if (itemData.item.Animal_ID == animal_selected || itemData.item.Animal_ID == 0) {
                                return <ModalSelectionItem id={itemData.item.ID} name={currentLanguage === 'ES' ? itemData.item.Name_ES : itemData.item.Name_EN} onSituationSelected={() => {
                                    dispatch(searchActions.situationSelected(itemData.item.ID))
                                    dispatch(emergencyActions.toggleSituation())
                                }} />
                            }
                        }}/>
                    </VirtualizedList>
                </View>}
                {!selectionItemsVisible && <View style={styles.content}>
                    <TouchableOpacity style={styles.close} onPress={() => {
                        dispatch(emergencyActions.toggleSituation())
                    }}><MaterialCommunityIcons name="close" color="#fff" size={30}/></TouchableOpacity>
                    <Text style={styles.title}>¿Sabes qué le ha pasado?</Text>
                    <Text style={styles.text}>Si sabes qué ha sucedido, selecciónalo aquí. En caso contrario cierra esta ventana pulsando sobre la X.</Text>
                    <PickerBtn title="Selecciona una situación" onSelect={() => {setSelectionItemsVisible(true)}}/>
                </View>} 
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
        color: 'white',
        textAlign: 'center',
        marginVertical: 15
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#222',
        width: d_width*0.8,
        maxHeight: d_height*0.6,
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
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        width: '100%',
        textAlign: 'center',
        marginVertical: 15
    },
    content: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        alignSelf: 'flex-end',
        marginBottom: 15
    },
    back: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginLeft: 15
    }
})