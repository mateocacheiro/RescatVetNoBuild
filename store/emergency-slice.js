import { createSlice } from "@reduxjs/toolkit"

const emergencySlice = createSlice({
    name: 'emergency',
    initialState: {
        info_id: -1,
        modal_info_visible: false,
        situation_modal_visible: true,
        lastAnswered: {
            id: null,
            answer: null
        },
        answeredList: [],
        newFormPage: false,
        accordionList: [],
        info_id: null
    },
    reducers: {
        updateAnswer(state, action) {
            const answer = action.payload
            const indexOfItem = state.answeredList.findIndex(q => q.id == answer.id)
            if (indexOfItem > -1) {
                state.answeredList[indexOfItem] = answer
            } else {
                state.answeredList = state.answeredList.concat(answer)
            }
        },
        updateInfoID(state, action) {
            const id = action.payload
            state.info_id = id
        },
        toggleInfoModal(state, action) {
            state.modal_info_visible = !state.modal_info_visible
            const id = action.payload
            if (id == -1) {
                state.info_id == null
            } else {
                state.info_id = id
            }
        },
        toggleSituation(state) {
            state.situation_modal_visible = !state.situation_modal_visible
        },
        updateFormPage(state) {
            state.newFormPage = !state.newFormPage
        }
    }
})

export const emergencyActions = emergencySlice.actions 
export default emergencySlice.reducer