import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../type/videoProps";

const API_KEY = process.env.REACT_APP_API_KEY;
export const getHarryVideos = createAsyncThunk('get/videos',
    async (id:string ) => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
            return filteredData
        } catch(err:any) {
            let error = err
            if (!error.response ) {
                throw err?.response?.data
            }
        }
    }
)

export const getHarryVideosInfo = createAsyncThunk('get/info' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            return data.items
          }
    })

interface IPlaylistProps {
    allVideos : IVideo[],
    music : IVideo[],
    harry : IVideo[],
    harryData : IVideo[],
    harryInfo : IVideo[],
    berry : IVideo[],
    bombing : IVideo[],
    summer : IVideo[]
}

const initialPlaylistState:IPlaylistProps = {
    allVideos : [],
    music : [],
    harry : [],
    harryData : [],
    harryInfo : [],
    bombing : [],
    berry : [],
    summer : [],
}

const playlistSlice = createSlice({
    name : 'playlist',
    initialState : initialPlaylistState,
    reducers : {
        setAllMusic(state,action) {
            state.allVideos = action.payload
        },
        setMusic(state,action) {
            state.music = action.payload
        },
        setHarryMusic(state,action) {
            state.harry = action.payload
        },
        setBombingMusic(state,action) {
            state.bombing = action.payload
        },
        setBerryMusic(state,action) {
            state.berry = action.payload
        },
        setSummerMusic(state,action) {
            state.summer = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getHarryVideos.fulfilled, (state, { payload }) => {
            state.harryData = payload
        });
        builder.addCase(getHarryVideosInfo.fulfilled, (state, { payload }) => {
            state.harryInfo = payload
        });
    },
})

export const playlistActions = playlistSlice.actions
export default playlistSlice.reducer