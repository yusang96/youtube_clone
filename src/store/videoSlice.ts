import { createSlice } from '@reduxjs/toolkit';
import { IVideo } from '../type/videoProps';

interface IVideoProps {
    selectedVideo : IVideo[]
    index : string
    isPlaying:boolean
    isLoop : boolean
    isMuted : boolean
    isRandom : boolean
    volume :number
    elapsedTime : number
    duration:number
}

const initialVideoState:IVideoProps = {
    selectedVideo : [],
    index : '',
    isPlaying:false,
    isMuted:false,
    isLoop : false,
    isRandom : false,
    volume : 0.3,
    elapsedTime : 0,
    duration : 0,
}

const videoSlice = createSlice({
    name : 'video' ,
    initialState :initialVideoState ,
    reducers : {
        setSelectedVideo(state,action) {
            state.selectedVideo = action.payload
        },
        currentIndex(state, action) {
            state.index = action.payload
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        setIsMuted(state,action) {
            action.payload ? state.isMuted = action.payload : state.isMuted = !state.isMuted
        },
        setIsLoop(state) {
            state.isLoop = !state.isLoop
        },
        setIsRandom(state) {
            state.isRandom = !state.isRandom
        },
        setVolume(state,action) {
            state.volume = action.payload
        },
        setElapsedTime(state,action) {
            state.elapsedTime = action.payload
        },
        setDuration(state,action) {
            state.duration = action.payload
        },
    }
})

export const videoActions = videoSlice.actions
export default videoSlice.reducer