import { createSlice } from "@reduxjs/toolkit"
import uuid from "react-native-uuid";
import {Alert} from 'react-native'

const contactFormSlice = createSlice({
    name: 'contactForm',
    initialState: {
        formInput: {
            name: '',
            email: '',
            subject: '',
            message: '',
            read: 0,
            date: '',
            attachedfile: {
                mimeType: '',
                name: '',
                size: 0,
                uri: ''
            }
        },
        modals: {
            subject_modal_visible: false
        }
    },
    reducers: {
        formSubmit(state, action) {
            const newState = action.payload
            state.formInput.name = newState.name
            state.formInput.email = newState.email
            state.formInput.subject = newState.subject
            state.formInput.message = newState.message
            state.formInput.date = newState.date
            fetch('https://rescatvet-default-rtdb.firebaseio.com/ContactForm.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: state.formInput.name,
                    email: state.formInput.email,
                    subject: state.formInput.subject,
                    message: state.formInput.message,
                    date: state.formInput.date,
                    read: state.formInput.read,
                })
            }).then(Alert.alert('', 'Muchas gracias por contactarnos. Recibirás una respuesta en un plazo de 48 horas.')).catch((error) => {return})
        },
        toggleModal(state, action) {
            const modalType = action.payload
            if (modalType === 1) {
                state.modals.subject_modal_visible = !state.modals.subject_modal_visible
            }
        },
        createFile(state, action) {
            const file = action.payload
            state.formInput.attachedfile.mimeType = file.mimeType
            state.formInput.attachedfile.name = file.name
            state.formInput.attachedfile.size = file.size
            state.formInput.attachedfile.uri = file.uri
        },
        removeFile(state) {
            state.formInput.attachedfile.mimeType = ''
            state.formInput.attachedfile.name = ''
            state.formInput.attachedfile.size = 0
            state.formInput.attachedfile.uri = ''
        },
        updateSubject(state, action) {
            const newSubject = action.payload
            state.formInput.subject = newSubject
            state.modals.subject_modal_visible = !state.modals.subject_modal_visible
        },
        resetForm(state) {
            state.formInput.attachedfile.mimeType = ''
            state.formInput.attachedfile.name = ''
            state.formInput.attachedfile.size = 0
            state.formInput.attachedfile.uri = ''
            state.formInput.email = ''
            state.formInput.name = ''
            state.formInput.subject = ''
            state.formInput.message = ''
        }
    }
})

export const contactFormActions = contactFormSlice.actions 
export default contactFormSlice.reducer
