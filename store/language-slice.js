import { createSlice } from "@reduxjs/toolkit"

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        selectedLanguage: 'ES',
        showLanguages: false
    },
    reducers: {
        changeLanguage(state, action) {
            const newLanguage = action.payload
            state.selectedLanguage = newLanguage
        },
        showLanguages(state) {
            state.showLanguages = !state.showLanguages
        }
    }
})

export const languageActions = languageSlice.actions 
export default languageSlice.reducer