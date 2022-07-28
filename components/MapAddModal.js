import { StyleSheet, Text, View, Dimensions, Modal, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { mapActions } from '../store/map-slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

const MapAddModal = () => {
    const modalVisible = useSelector(state => state.map.modals.add_modal_visible)
    const currentLanguage = useSelector(state => state.language.selectedLenguage)

    const [nameValid, setNameValid] = useState(true)
    const [addressValid, setAddressValid] = useState(true)
    const [openingHoursValid, setOpeninHoursValid] = useState(true)
    const [contactValid, setContactValid] = useState(true)
    const [coordinatesValid, setCoordinatesValid] = useState(true)
    const [exoticAdmissionValid, setExoticAdmissionValid] = useState(true)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [openingHours, setOpeningHours] = useState('')
    const [contact, setContact] = useState('')
    const [exoticAdmission, setExoticAdmission] = useState()
    const [coordinates, setCoordinates] = useState('')

    const dispatch = useDispatch()

    let name_placeholder
    let address_placeholder
    let opening_hours_placeholder
    let contact_placeholder
    let exotic_admission_placeholder
    let coordinates_placeholder

    if(currentLanguage === 'ES') {
        name_placeholder = "Nombre de la clínica"
        address_placeholder = "Dirección"
        opening_hours_placeholder = "Horarios de apertura"  
        contact_placeholder = "Teléfono de contacto"  
        coordinates_placeholder = "Coordenadas (latitud, longitud)"
        exotic_admission_placeholder = "Aceptan animales exóticos?"    
    } else {
        name_placeholder = "Vet clinic name"
        address_placeholder = "Address"
        opening_hours_placeholder = "Opening Hours"
        contact_placeholder = "Contact phone"
        coordinates_placeholder = "Coordinates (latitude, longitude)"
        exotic_admission_placeholder = "Are exotic animals accepted?"
    }

    return (
        <Modal animationType='fade' animationInTiming={0.5} animationOutTiming={0.5} transparent={true} visible={modalVisible}>
        <Pressable style={styles.modal} onPress={() => dispatch(mapActions.toggleModal(2))}>
            <View style={styles.inner}>
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.title}>Añadir nueva clínica</Text>
                        <View style={styles.divider} />
                        <TextInput style={[styles.textInput, {borderColor: nameValid === false ? 'red' : Colors.primary}]} value={name} placeholder={name_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setName(value)} />
                        <TextInput multiline numberOfLines={3} style={[styles.multilineInput, {borderColor: addressValid === false ? 'red' : Colors.primary}]} value={address} placeholder={address_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setAddress(value)} />
                        <Text style={styles.annotation}>* (Ej.Calle de Velázquez, 109, CP 28006, Madrid, España)</Text>
                        <TextInput multiline numberOfLines={3} style={[styles.multilineInput, {borderColor: openingHoursValid === false ? 'red' : Colors.primary}]} value={openingHours} placeholder={opening_hours_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setOpeningHours(value)} />
                        <Text style={styles.annotation}>* (Ej. Lunes - Viernes: 9 AM - 8:30 PM)</Text>
                        <TextInput style={[styles.textInput, {borderColor: contactValid === false ? 'red' : Colors.primary}]} value={contact} placeholder={contact_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setContact(value)} />
                        <Text style={styles.annotation}>* (Ej. +34 555 55 55 55)</Text>
                        <TextInput style={[styles.textInput, {borderColor: coordinatesValid === false ? 'red' : Colors.primary}]} value={coordinates} placeholder={coordinates_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setCoordinates(value)} />
                        <Text style={styles.annotation}>* Opcional (Ej. +43.9937728, -8.188827)</Text>
                        <TextInput style={[styles.textInput, {borderColor: exoticAdmissionValid === false ? 'red' : Colors.primary}]} value={exoticAdmission} placeholder={exotic_admission_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setExoticAdmission(value)} />
                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
                            let date = moment().format('DD/MM/YYYY - HH:mm')
                            dispatch(mapActions.submitClinic({
                                name,
                                address,
                                openingHours,
                                contact,
                                coordinates,
                                exoticAdmission,
                                date
                            }))
                            dispatch(mapActions.toggleModal(2))
                        }}>
                            <Text style={styles.btnText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancel} activeOpacity={0.8} onPress={() => dispatch(mapActions.toggleModal(2))}>
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>  
            </View>
        </Pressable>
    </Modal>
    )
}

export default MapAddModal

const d_width = Dimensions.get('window').width

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white'
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10
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
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textInput: {
        width: d_width * 0.8,
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginBottom: 2.5,
        marginTop: 5,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'montserrat',
    },
    multilineInput: {
        width: d_width * 0.8,
        height: 100,
        borderWidth: 1,
        padding: 10,
        marginBottom: 2.5,
        marginTop: 5,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'montserrat',
        textAlignVertical: 'top'
    },
    annotation: {
        fontFamily: 'montserrat',
        fontSize: 11,
        color: '#fff',
        width: d_width*0.8,
        marginVertical: 5,
        textAlign: 'left',
        textAlignVertical: 'top'
    },
    label: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 14,
        textAlign: 'left',
        width: d_width*0.8,
        marginVertical: 5
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
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#aaa',
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 15,
        zIndex: 5
    },
})