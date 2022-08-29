import { createSlice } from "@reduxjs/toolkit"

const careSlice = createSlice({
    name: 'care',
    initialState: {
        navigatedToSplay: false,
        navigatedToEggs: false,
        splayPosition: 0,
        eggsPosition: 0
    },
    reducers: {
        toggleSplayNav(state) {
            state.navigatedToSplay = !state.navigatedToSplay
        },
        toggleEggsNav(state) {
            state.navigatedToEggs = !state.navigatedToEggs
        },
        updateSplayPosition(state, action) {
            const y_pos = action.payload
            state.splayPosition = y_pos
        },
        updateEggsPosition(state, action) {
            const y_pos = action.payload
            state.eggsPosition = y_pos
        }
    }
})

export const careActions = careSlice.actions
export default careSlice.reducer