import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { emergencyActions } from '../store/emergency-slice'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const InfoModal = (props) => {

    const modalVisible = useSelector(state => state.emergency.modal_info_visible)
    const dispatch = useDispatch()
    const id = props.id
    let info_text
    if(id == 0) {
        info_text = "Si no estás segure, puede poner la mano sobre un lado de su pecho, sobre las costillas"
    }
    if(id == 1) {
        info_text = "Puedes poner la mano debajo del ala, y así deberías de notarle el pulso"
    }
    if(id == 2) {
        info_text = "Puedes alumbrarle un ojo con la linterna del móvil y apartarla, para ver si la pupila cambia de tamaño."
    }
    if(id == 3) {
        info_text = "Las palomas tienen una temperatura corporal un poco mayor a la del ser humano, debemos notarlas calentitas. Si dispones de termómetro, se debe introducir por la cloaca, preferentemente lubricado con aceite vegetal o vaselina. Debe estar a unos 38-39ºC. Si no, coloca dos dedos bajo su ala."
    }
    if(id == 4) {
        info_text = "El estado natural de las palomas es alerta, con los ojos abiertos y una postura atenta."
    }
    if(id == 5) {
        info_text = "Cabeza torcida sin posibilidad de ponerla recta."
    }
    if(id == 6) {
        info_text = "La posición natural de las alas es plegadas hacia atrás y pegadas a la cola por arriba o por abajo, pero nunca caídas."
    }
    if(id == 7) {
        info_text = "La cloaca es por donde salen las heces."
    }
    if(id == 8) {
        info_text = "Las pápulas son bultos con herida que se pueden presentar en patas, cuello, pico u ojos."
    }
    if(id == 9) {
        info_text = "Un cuerpo extraño es un objeto ajeno al animal, como una ramita, espiga, pincho, clavo, etc."
    }

    return (
        <Modal animationType='fade' animationInTiming={0.5} animationOutTiming={0.5} transparent={true} visible={modalVisible}>
            <Pressable style={styles.modal} onPress={() => dispatch(emergencyActions.toggleModal())}>
            <View style={styles.inner}>
                <View style={styles.close}>
                    <MaterialCommunityIcons name="close" size={25} color="#fff" />
                </View>
                <Text style={styles.text}>{info_text}</Text>
            </View>
        </Pressable>
        </Modal>
    )
}

export default InfoModal

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white',
        width: '90%',
        textAlign: 'center'
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
        width: d_width*0.9,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button: {
        backgroundColor: Colors.primary,
        width: d_width * 0.8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 7.5
    },
    btnText: {
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: 'white'
    },
    close: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginTop: 0,
        marginBottom: 20,
        marginLeft: -25
    }
})