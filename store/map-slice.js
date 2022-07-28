import { createSlice } from "@reduxjs/toolkit"
import {Alert} from 'react-native'

const mapSlice = createSlice({
    name: 'map',
    initialState: {
        modals: {
            filter_modal_visible: false,
            add_modal_visible: false
        },
        filter: {
            radius: 5,
            open_now: 'all',
            //filter_changed: false
        },
        add_clinic_input: {
            name: '',
            address: '',
            openingHours: '',
            contact: '',
            coordinates: '',
            exoticAdmission: '',
            read: 0,
            date: ''
        }
    },
    reducers: {
        toggleModal(state, action) {
            const modal = action.payload
            if (modal === 1) {
                state.modals.filter_modal_visible = !state.modals.filter_modal_visible
            } else if (modal === 2) {
                state.modals.add_modal_visible = !state.modals.add_modal_visible
            }
        },
        updateFilter(state, action) {
            const filter_obj = action.payload
            state.filter.open_now = filter_obj.open_now
            state.filter.radius = filter_obj.radius
            state.filter.filter_changed = true
        },
        submitClinic(state, action) {
            const formInput = action.payload
            state.add_clinic_input.name = formInput.name
            state.add_clinic_input.address = formInput.address
            state.add_clinic_input.openingHours = formInput.openingHours
            state.add_clinic_input.contact = formInput.contact
            state.add_clinic_input.coordinates = formInput.coordinates
            state.add_clinic_input.exoticAdmission = formInput.exoticAdmission
            state.add_clinic_input.date = formInput.date
            fetch('https://rescatvet-default-rtdb.firebaseio.com/MapForm.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: state.add_clinic_input.name,
                    address: state.add_clinic_input.address,
                    openingHours: state.add_clinic_input.openingHours,
                    contact: state.add_clinic_input.contact,
                    coordinates: state.add_clinic_input.coordinates,
                    exoticAdmission: state.add_clinic_input.exoticAdmission,
                    read: state.add_clinic_input.read,
                    date: state.add_clinic_input.date
                })
            }).then(Alert.alert('', 'Muchas gracias por tu colaboración. En un plazo de  dos días añadiremos la información después de verificarla.')).catch((error) => {return})
        }
    }
})

export const mapActions = mapSlice.actions 
export default mapSlice.reducer