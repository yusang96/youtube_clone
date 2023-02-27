import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./playlistSlice";
import videoSlice from "./videoSlice";

export const store = configureStore({
    reducer : {
        video : videoSlice,
        playlist : playlistSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
