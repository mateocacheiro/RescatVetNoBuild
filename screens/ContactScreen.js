import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, ScrollView, View, Dimensions, TextInput, Alert } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { contactFormActions } from '../store/contactForm-slice.js'
import PickerBtn from '../components/PickerBtn'
import C_Button from '../components/C_Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Clipboard from 'expo-clipboard'
import * as DocumentPicker from 'expo-document-picker'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import moment from 'moment'
import SubjectModal from '../components/SubjectModal'
import * as FileSystem from 'expo-file-system'
import { screenActions } from '../store/screen-slice'
import {useRoute} from '@react-navigation/native'
import InterfaceModal from '../components/InterfaceModal'

// Initialize Firebase


const ContactScreen = ({navigation}) => {

    const currentLanguage = useSelector(state => state.language.selectedLenguage)
    const pgpkey = "-----BEGIN PGP PUBLIC KEY BLOCK-----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YXSU-----END PGP PUBLIC KEY BLOCK-----"
    const [keyVisible, setKeyVisible] = useState(false)
    const subject_modal_visible = useSelector(state => state.contactForm.modals.subject_modal_visible)
    const selectedSubject = useSelector(state => state.contactForm.formInput.subject)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [otherSubject, setOtherSubject] = useState('')
    const [message, setMessage] = useState('')
    const [attachedFileName, setAttachedFileName] = useState('')
    const [emailValid, setEmailValid] = useState()
    const [nameValid, setNameValid] = useState()
    const [subjectValid, setSubjectValid] = useState()
    const [messageValid, setMessageValid] = useState()
    const [contactHelp, setContactHelp] = useState(false)
    const dispatch = useDispatch()
    const [attachActive, setAttachActive] = useState(false)

    const interface_id = useSelector(state => state.screen.interfaceHelp)
    const interface_help_shown = useSelector(state => state.screen.interfaceHelpShown)
    
    useEffect(() => {
        navigation.addListener('focus', () => {
            dispatch(screenActions.getInterfaceHelp(3))
            dispatch(screenActions.changeCurrentScreen('Contact'))
            console.log("Contact Screen is focused")
        })
    }, [navigation])

    useEffect(() => {
        if (interface_id === 3 && interface_help_shown === true) {
            setContactHelp(true)
        } else if (interface_id === 3 && interface_help_shown === false) {
            setContactHelp(false)
        }
    }, [interface_id, interface_help_shown])

    const renderContent = () => {
        let intro_text
        let intro_title
        let form_title
        let subject_title
        let name_placeholder
        let other_placeholder
        let message_placeholder
        let attach_text
        let submit_btn_text
        let reset_text
        let other_contact_text
        let copy_text
        let showKey_text
        let hideKey_text

        if (currentLanguage === 'ES') {
            intro_text = 'En el formulario de contacto podrás contactarnos para reportar cualquier error que te encuentres, o sugerir alguna mejora, seleccionando "Reporte de error en la app" o "Sugerencia" en el segundo desplegable con el nombre de "Asunto". Para cualquier otra consulta selecciona "Otro" y escribe el título en el campo de texto que aparecerá debajo.'
            intro_title = 'Has encontrado algún error o tienes alguna sugerencia?'
            form_title = 'Formulario de contacto'
            name_placeholder = 'Nombre'
            other_placeholder = 'Escribe el asunto'
            message_placeholder = 'Mensaje'
            attach_text = 'Adjuntar archivos'
            submit_btn_text = 'Enviar'
            reset_text = 'Resetear formulario'
            other_contact_text = 'También puedes contactarnos por las siguientes vías'
            copy_text = 'Copiar'
            showKey_text = 'Mostrar clave'
            hideKey_text = 'Ocultar clave'
            if (!selectedSubject) {
                subject_title = 'Asunto'
            } else if (selectedSubject === 'Error') {
                subject_title = 'Error en la app'
            } else if (selectedSubject === 'Suggestion') {
                subject_title = 'Sugerencia'
            } else if (selectedSubject === 'Other') {
                subject_title = 'Otro'
            }

            if (!attachedFileName) {
                attach_text = 'Adjuntar archivo (opcional)'
            } else {
                attach_text = attachedFileName
            }

        } else {
            intro_text = 'Through the contact form below you will be able to contact us to report error any you have came across, or suggest any improvements by selecting the corresponding option on the "About" section (Error report / Suggestion). For any other consultation, select "Other" and write the topic on the text field that will appear right below.'
            intro_title = 'Have you found any error or do you have a suggestion?'
            form_title = 'Contact form'
            name_placeholder = 'Name'
            other_placeholder = 'Type the subject'
            message_placeholder = 'Message'
            attach_text = 'Attach files'
            submit_btn_text = 'Send'
            reset_text = 'Reset form'
            other_contact_text = 'You can also contact us through the following ways'
            copy_text = 'Copy'
            showKey_text = 'Show key'
            hideKey_text = 'Hide key'
            if (selectedSubject === '') {
                subject_title = 'Subject'
            } else {
                subject_title = selectedSubject
            }
        }

        const copyToClipboard = () => {
            Clipboard.setString(pgpkey)
            Alert.alert('','PGP Key copied to clipboard')
        }

        const saveKey = () => {
            return
        }

        const verifyPermissions = async () => {
            let { status } = await MediaLibrary.getPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('', 'Permission not granted!')
                return false
            }
            return true
        }

        const attachFile = async () => {
            const hasPermissions = await verifyPermissions()
            if(!hasPermissions) {
                return
            } else {
                const attached_file = await DocumentPicker.getDocumentAsync()
                if (attached_file.name) {
                    Alert.alert('', `${attached_file.name} has been attached`)
                    dispatch(contactFormActions.createFile(attached_file))
                    if(attached_file.name.length > 40){
                        const string = attached_file.name
                        const trimmedString = `${string.substring(0, 20)}...`
                        setAttachedFileName(trimmedString)
                    } else {
                        setAttachedFileName(attached_file.name)
                    }
                } else {
                    Alert.alert('', 'No file was attached')
                }
            }
        }

        useEffect(() => {
            if (name && name.replace(/\s/g, '').length === 0) {
                setNameValid(false)
            } else {
                setNameValid(true)
            }
        }, [name])

        useEffect(() => {
            if (email) {
                if(!email.includes('@') || email.startsWith('@')) {
                    setEmailValid(false)
                } else {
                    const emailDomain = email.split('@')[1]
                    if (!emailDomain.includes('.') || emailDomain.endsWith('.')) {
                        setEmailValid(false)
                    } else {
                        setEmailValid(true)
                    }
                }
            }
        }, [email])

        useEffect(() => {
            if (selectedSubject === 'Error' || selectedSubject === 'Suggestion') {
                setSubjectValid(true)
            } else if (selectedSubject === 'Other' && otherSubject && otherSubject.replace(/\s/g, '').length === 0) {
                setSubjectValid(false)
            }
        }, [selectedSubject])

        useEffect(() => {
            if(otherSubject && otherSubject.replace(/\s/g, '').length === 0) {
                setSubjectValid(false)
            } else {
                setSubjectValid(true)
            }
        }, [otherSubject])

        useEffect(() => {
            if (message && message.replace(/\s/g, '').length === 0) {
                setMessageValid(false)
            } else {
                setMessageValid(true)
            }
        }, [message])

        const submitFormHandler = () => {
            let final_subject
            let error_alert_str = 'Please correct the fields in red.'
            if (otherSubject) {
                final_subject = otherSubject
            } else {
                final_subject = selectedSubject
            }

            //Message validation

            if (email && emailValid && name && nameValid && selectedSubject && subjectValid && message && messageValid) {
                let submissionDate = moment().format('DD/MM/YYYY - HH:mm')
                const formData = {
                    name: name,
                    email: email,
                    subject: final_subject,
                    message: message,
                    date: submissionDate
                }
                dispatch(contactFormActions.formSubmit(formData))
                dispatch(contactFormActions.resetForm())
                setName('')
                setEmail('')
                setOtherSubject('')
                setMessage('')
                setAttachedFileName('')
            } else if (email === '' || name === '' || selectedSubject === '' || (selectedSubject && otherSubject === '') || message === '') {
                Alert.alert('Fatal Error', 'Por favor, rellena los campos en blanco.')
                return
            } else {
                Alert.alert('Fatal Error', error_alert_str)
                return
            }
        }

        const removeFile = () => {
            dispatch(contactFormActions.removeFile())
            setAttachedFileName('')
        }

        return(
            <View style={styles.container}>
                {subject_modal_visible && <SubjectModal />}
                <Card>
                    <MaterialCommunityIcons name="frequently-asked-questions" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{intro_title}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.text}>{intro_text}</Text>
                </Card>
                <Card>
                    <MaterialCommunityIcons name="form-textbox" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{form_title}</Text>
                    <View style={styles.divider} />
                    <TextInput style={[styles.textInput, {borderColor: nameValid === false ? 'red' : Colors.primary}]} value={name} placeholder={name_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setName(value)} />
                    <TextInput style={[styles.textInput, {borderColor: emailValid === false ? 'red' : Colors.primary}]} value={email} placeholder='Email' placeholderTextColor='#ccc' onChangeText={(value) => setEmail(value)}/>
                    <PickerBtn title={subject_title} onSelect={() => {dispatch(contactFormActions.toggleModal(1))}} />
                    {selectedSubject === 'Other' && <TextInput style={[styles.textInput, {borderColor: subjectValid === false ? 'red' : Colors.primary}]} value={otherSubject} placeholder={other_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setOtherSubject(value)} />}
                    <TextInput multiline numberOfLines={5} value={message} style={[styles.message, {borderColor: messageValid === false ? 'red' : Colors.primary}]} placeholder={message_placeholder} placeholderTextColor='#ccc' onChangeText={(value) => setMessage(value)} />
                    {attachActive && <View style={styles.attach}>
                        <MaterialCommunityIcons name="paperclip" size={24} color={Colors.primary} />
                        <TouchableOpacity onPress={attachFile}>
                            <Text style={[styles.text, {textDecorationLine: 'underline'}]}>{attach_text}</Text>
                        </TouchableOpacity>
                        {attachedFileName !== "" && <TouchableOpacity onPress={removeFile}><MaterialCommunityIcons name='close' size={20} color='white' style={{marginLeft: 10}} /></TouchableOpacity>}
                    </View>}
                    <C_Button style={{width: Dimensions.get('window').width*0.8}} title={submit_btn_text} onHandlePress={submitFormHandler} />
                    <TouchableOpacity onPress={()=>{
                        dispatch(contactFormActions.resetForm())
                        setName('')
                        setEmail('')
                        setOtherSubject('')
                        setMessage('')
                        setAttachedFileName('')
                    }}>
                        <Text style={[styles.text, {textDecorationLine: 'underline'}]}>{reset_text}</Text>
                    </TouchableOpacity>
                </Card>
                <Card>
                    <MaterialCommunityIcons name="card-text" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{other_contact_text}</Text>
                    <View style={styles.divider}/>
                    <View style={styles.contact_block}>
                        <Text style={styles.sub_title}>Email:</Text>
                        <Text style={styles.text}>rescatvet@tutanota.com</Text>
                        <Text style={styles.text}>xshadowmedia@protonmail.com</Text>
                        <Text style={styles.text}>xshadowmedia@elude.in</Text>
                    </View>
                    <View style={styles.contact_block}>
                        <Text style={styles.sub_title}>XMPP (OMEMO):</Text>
                        <Text style={styles.text}>rescatvet@jabber.calyxinstitute.org</Text>
                        <Text style={styles.text}>xshadowmedia@jabber.calyxinstitute.org</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contact_block}>
                        <Text style={styles.sub_title}>Clave pública PGP:</Text>
                        <Text style={styles.sub_title}>Huella:</Text>
                        <Text style={styles.text}>7DB5 C551 1B78 18B1 EE65  E0F5 A75A E029 1C36 94B7</Text>
                    </View>
                    <View style={styles.contact_block}>
                        <Text style={styles.sub_title}>ID:</Text>
                        <Text style={styles.text}>A75A E029 1C36 94B7</Text>
                    </View>
                    <View style={styles.contact_block}>
                        <Text style={styles.sub_title}>Fecha de creación:</Text>
                        <Text style={styles.text}>10/9/2021</Text>
                    </View>
                    <View style={styles.contact_block}>
                        <View style={styles.copysave}>
                            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                                <MaterialCommunityIcons name="content-copy" size={24} color="white" />
                                <Text style={styles.buttonText}>{copy_text}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton}>
                                <MaterialCommunityIcons name="download" size={24} color="white" onPress={saveKey} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contact_block}>
                        <TouchableOpacity style={styles.accordion} onPress={() => {setKeyVisible(!keyVisible)}}>
                            {!keyVisible && <Text style={styles.text}>{showKey_text}</Text>}
                            {keyVisible && <Text style={styles.text}>{hideKey_text}</Text>}
                            {!keyVisible && <MaterialCommunityIcons name="chevron-down" size={24} color="white" />}
                            {keyVisible && <MaterialCommunityIcons name="chevron-up" size={24} color="white" />}
                        </TouchableOpacity>
                        {keyVisible && <Text style={styles.pgpText}>{pgpkey}</Text>}
                    </View>
                </Card>
            </View>
        )
    }

    const renderHelp = () => {
        return(
            <InterfaceModal />
        )
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: Colors.lightBG}}>
            {contactHelp && renderHelp()}
            {renderContent()}
        </ScrollView>
    )
}

export default ContactScreen

const dHeight = Dimensions.get('window').height
const dWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBG,
        width: dWidth,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: dHeight * 0.015,
        paddingBottom: dHeight * 0.015
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: '#fff',
        textAlign: 'justify'
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    textInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginBottom: 2.5,
        marginTop: 5,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'montserrat',
    },
    message: {
        width: '100%',
        flex: 1,
        height: 200,
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 2.5,
        marginTop: 5,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'montserrat',
        overflow: 'scroll',
        textAlign: 'left',
        textAlignVertical: 'top',
        alignItems: 'flex-start'
    },
    attach: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: -dWidth*0.03
    },
    divider: {
        height: dHeight*0.002,
        backgroundColor: '#aaa',
        width: '100%',
        marginBottom: 15
    },
    sub_title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        paddingBottom: 10
    },
    contact_block: {
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 15
    },
    copysave: {
        flexDirection: 'row',
        width: dWidth*0.87,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: -dWidth*0.01
    },
    copyButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width*0.72,
        padding: 8,
        borderRadius: 5
    },
    saveButton: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width*0.13,
        padding: 8,
        borderRadius: 5
    },
    buttonText: {
        fontFamily: 'montserrat-bold',
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        marginLeft: 5
    },
    accordion: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pgpText: {
        fontFamily: 'montserrat',
        color: 'white',
        textAlign: 'justify',
        fontSize: 12,
        marginTop: 15
    }
})
