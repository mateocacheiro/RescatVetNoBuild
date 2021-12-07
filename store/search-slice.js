import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchText: '',
        classSelected: '',
        modals: {
            class_modal_visible: false,
            caracteristica_modal_visible: false,
            ayuda_modal_visible: false
        },
        caracteristicas: [],
        textInputValue: '',
        animalSelected_id: 0,
    },
    reducers: {
        updateSearch(state, action) {
            const newSearchText = action.payload
            state.searchText = newSearchText
            state.textInputValue = newSearchText
        },
        updateClassSelection(state, action) {
            const selected = action.payload
            state.classSelected = selected
        },
        toggleModal(state, action) {
            switch (action.payload) {
                case 1:
                    state.modals.class_modal_visible = !state.modals.class_modal_visible
                    break;
                case 2:
                    state.modals.caracteristica_modal_visible = !state.modals.caracteristica_modal_visible
                    break;
                case 3:
                    state.modals.ayuda_modal_visible = !state.modals.ayuda_modal_visible
                    break;
                default:
                    break;
            }
        },
        toggleSelectedChar(state, action) {
            const caracteristica = action.payload
            if (!state.caracteristicas.includes(caracteristica)) {
                state.caracteristicas.push(caracteristica)
            } else {
                state.caracteristicas = state.caracteristicas.filter(item => item !== caracteristica )
            }
        },
        animalSelected(state, action) {
            const id = action.payload
            state.animalSelected_id = id
        }
    }
})

export const searchActions = searchSlice.actions 
export default searchSlice.reducer