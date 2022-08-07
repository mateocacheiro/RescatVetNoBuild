import { createSlice } from "@reduxjs/toolkit"

const emergencySlice = createSlice({
    name: 'emergency',
    initialState: {
        question_id: -1,
        value: '',
        info_id: -1,
        modal_info_visible: false,
        situation_modal_visible: true,
        chevron_state: {
            isBreathing: 2,
            hasHeavyBreathing: 2,
            hasSlowBreathing: 2,
            hasFastBreathing: 2,
            hasBlood: 2,
            bloodOrifice: 2,
            hasOpenWounds: 2,
            hasFeces: 2,
            liquidFeces: 2,
            bloodFeces: 2,
            greenFeces: 2,
            denseFeces: 2
        },
        question_change: -1
    },
    reducers: {
        updateAnswer(state, action) {
            const answer = action.payload
            const id = answer.id
            const value = answer.value
            state.question_id = id
            state.value = value
        },
        updateInfoID(state, action) {
            const id = action.payload
            state.info_id = id
        },
        toggleModal(state) {
            state.modal_info_visible = !state.modal_info_visible
        },
        updateChevronStates(state, action) {
            const chv_state = action.payload
            if (chv_state.id == 0) {
                state.chevron_state.isBreathing = chv_state.value
            } else if (chv_state.id == 4) {
                state.chevron_state.hasHeavyBreathing = chv_state.value
            } else if (chv_state.id == 5) {
                state.chevron_state.hasSlowBreathing = chv_state.value
            } else if (chv_state.id == 6) {
                state.chevron_state.hasFastBreathing = chv_state.value
            }
        },
        changeQuestion(state, action) {
            const qid = action.payload
            state.question_change = qid
        },
        toggleSituation(state) {
            state.situation_modal_visible = !state.situation_modal_visible
        }
    }
})

export const emergencyActions = emergencySlice.actions 
export default emergencySlice.reducer