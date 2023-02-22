import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { emergencyActions } from '../store/emergency-slice'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import EmergencyQuestions from '../assets/database/EmergencyQuestions.json'

const InfoModal = (props) => {

    const modalVisible = useSelector(state => state.emergency.modal_info_visible)
    const dispatch = useDispatch()
    let info_text
    const currentLanguage = useSelector(state => state.language.selectedLanguage)
    console.log(currentLanguage)
    const id = useSelector(state => state.emergency.info_id)
    useEffect(() => {
        
    }, [modalVisible])
    const emergencyQuestionsObj = EmergencyQuestions.filter(function(element){return element.ID == id})[0]
    if (currentLanguage == 'ES') {
        info_text = emergencyQuestionsObj.InfoES
    } else {
        info_text = emergencyQuestionsObj.InfoEN
    }

    return (
        <Modal animationType='fade' animationInTiming={0.5} animationOutTiming={0.5} transparent={true} visible={modalVisible}>
            <Pressable style={styles.modal} onPress={() => {
                dispatch(emergencyActions.toggleInfoModal(-1))
            }}>
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