import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";


export const store = configureStore({
    reducer : {
        video : videoSlice
    }
})