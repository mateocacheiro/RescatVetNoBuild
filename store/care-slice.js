import { createSlice } from "@reduxjs/toolkit"

const careSlice = createSlice({
    name: 'care',
    initialState: {
        navigatedToSplay: false,
        splayPosition: 0
    },
    reducers: {
        toggleSplayNav(state) {
            state.navigatedToSplay = !state.navigatedToSplay
        },
        updateSplayPosition(state, action) {
            const y_pos = action.payload
            state.splayPosition = y_pos
        }
    }
})

export const careActions = careSlice.actions
export default careSlice.reducer