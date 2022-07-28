import { createSlice } from "@reduxjs/toolkit"

const screenSlice = createSlice({
    name: 'map',
    initialState: {
        currentScreen: 'Home',
        interfaceHelp: 0,
        interfaceHelpShown: false
    },
    reducers: {
        changeCurrentScreen(state, action) {
            const screen = action.payload
            state.currentScreen = screen
        },
        getInterfaceHelp(state, action) {
            const interface_id = action.payload
            state.interfaceHelp = interface_id
        },
        showInterfaceHelp(state) {
            state.interfaceHelpShown = true
        },
        hideInterfaceHelp(state) {
            state.interfaceHelpShown = false
        }
    }
})

export const screenActions = screenSlice.actions 
export default screenSlice.reducer