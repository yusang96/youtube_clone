import { createSlice } from '@reduxjs/toolkit';

const initialVideoState = {
    coverVideos : [],
    index : '',
    isPlaying:false,
    isMuted:false,
    volume : 0.3,
    elapsedTime : '00:00',
    progressTime : 0,
    currentSeek : 0,
    duration : 0,
}

const videoSlice = createSlice({
    name : 'video' ,
    initialState :initialVideoState ,
    reducers : {
        setCoverVideos(state,action) {
            state.coverVideos = action.payload
        }
        ,
        currentIndex(state, action) {
            state.index = action.payload
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        setIsMuted(state,action) {
            action.payload ? state.isMuted = action.payload : state.isMuted = !state.isMuted
        },
        setVolume(state,action) {
            state.volume = action.payload
        },
        setElapsedTime(state,action) {
            state.elapsedTime = action.payload
        },
        setProgressTime(state,action) {
            state.progressTime = action.payload
        },
        setCurrentSeek(state,action) {
            state.currentSeek = action.payload
        },
        setDuration(state,action) {
            state.duration = action.payload
        },
    }
})

export const videoActions = videoSlice.actions
export default videoSlice.reducer