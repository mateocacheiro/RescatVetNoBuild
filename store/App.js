import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-slice";
import languageSlice from "./language-slice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        language: languageSlice
    }
})

export default store