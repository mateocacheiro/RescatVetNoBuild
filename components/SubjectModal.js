import { StyleSheet, Text, View, Dimensions, Modal, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { contactFormActions } from '../store/contactForm-slice'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'

const SubjectModal = () => {

    const modalVisible = useSelector(state => state.contactForm.modals.subject_modal_visible)

    const subject = useSelector(state => state.contactForm.formInput.subject)

    const dispatch = useDispatch()
  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <Pressable style={styles.modal} onPress={() => {dispatch(contactFormActions.toggleModal(1))}}>
            <View style={styles.inner}>
                <View>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(contactFormActions.updateSubject('Error'))
                        }}>
                        <Text style={styles.text}>Error en la app</Text>
                        {subject === 'Error' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {subject !== 'Error' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(contactFormActions.updateSubject('Suggestion'))
                        }}>
                        <Text style={styles.text}>Sugerencia</Text>
                        {subject === 'Suggestion' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {subject !== 'Suggestion' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => {
                            dispatch(contactFormActions.updateSubject('Other'))
                        }}>
                        <Text style={styles.text}>Otro</Text>
                        {subject === 'Other' && <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />}
                        {subject !== 'Other' && <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                </View>  
            </View>
        </Pressable>
    </Modal>
  )
}

export default SubjectModal

const d_width = Dimensions.get('window').width

const d_height = Dimensions.get('window').height

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
        height: d_height*0.2,
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
    
})