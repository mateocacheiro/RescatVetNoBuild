import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-slice";
import languageSlice from "./language-slice";
import contactFormSlice from './contactForm-slice';
import screenSlice from "./screen-slice";
import mapSlice from './map-slice'
import emergencySlice from "./emergency-slice";
import careSlice from "./care-slice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        language: languageSlice,
        contactForm: contactFormSlice,
        screen: screenSlice,
        map: mapSlice,
        emergency: emergencySlice,
        care: careSlice
    }
})

export default store