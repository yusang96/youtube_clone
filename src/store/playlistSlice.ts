import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../type/videoProps";

const API_KEY = process.env.REACT_APP_API_KEY;
const friaplaylistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'
const harryPlayListId ='PLK9rW7UvhqXY05BfQgtLx_e0DJEwAkSE7'
const berryPlayListId = 'PLIWPn8Vlm2Bm-FRmYH-rvG8EHhVU4fmLX'
const bombingPlayListId = 'PLdpjCrUcXsVQl5lQCUGsHs-yeM0X6hXNn'

export const getFriaVideos = createAsyncThunk('get/friaVideos',
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${friaplaylistId}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            return data.items
        } catch(err:any) {
            let error = err
            if (!error.response ) {
                throw err?.response?.data
            }
        }
    }
)
export const getFriaVideosInfo = createAsyncThunk('get/friaInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            return sortedVideo
          }
    })

export const getHarryVideos = createAsyncThunk('get/harryVideos',
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${harryPlayListId}&maxResults=10&key=${API_KEY}`)
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

export const getHarryVideosInfo = createAsyncThunk('get/harryInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            return data.items
          }
    })

export const getBerryVideos = createAsyncThunk('get/berryVideos' , 
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${berryPlayListId}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
            return filteredData
        } catch(err:any) {
            let error = err
            if (!error.response ) {
                throw err?.response?.data
            }
        }
})

export const getBerryVideosInfo = createAsyncThunk('get/berryInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            return data.items
          }
    })

    export const getBombingVideos = createAsyncThunk('get/bombingVideos' , 
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${bombingPlayListId}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
            return filteredData
        } catch(err:any) {
            let error = err
            if (!error.response ) {
                throw err?.response?.data
            }
        }
})

export const getBombingVideosInfo = createAsyncThunk('get/bombingInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            return data.items
          }
    })

interface IPlaylistProps {
    loading : boolean,
    allVideos : IVideo[],
    friaMusic : IVideo[],
    friaData : IVideo[],
    friaPlaylist : IVideo[],
    harryData : IVideo[],
    harryInfo : IVideo[],
    berryData : IVideo[],
    berryInfo : IVideo[],
    bombingData : IVideo[],
    bombingInfo : IVideo[],
    berry : IVideo[],
    bombing : IVideo[],
    summer : IVideo[]
}

const initialPlaylistState:IPlaylistProps = {
    loading : false,
    allVideos : [],
    friaMusic : [],
    friaData : [],
    friaPlaylist : [],
    harryData : [],
    harryInfo : [],
    berryData : [],
    berryInfo : [],
    bombingData : [],
    bombingInfo : [],
    bombing : [],
    berry : [],
    summer : [],
}

const playlistSlice = createSlice({
    name : 'playlist',
    initialState : initialPlaylistState,
    reducers : {
        setAllMusic(state,action) {
            state.allVideos.push(...action.payload)
        },
        setMusic(state,action) {
            state.friaMusic = action.payload
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
        builder.addCase(getFriaVideos.fulfilled, (state, { payload }) => {
            state.friaData = payload
        });
        builder.addCase(getFriaVideosInfo.fulfilled, (state:IPlaylistProps, { payload }) => {
            if (payload) {            
                state.friaPlaylist = payload
            }
        });
        builder.addCase(getHarryVideos.fulfilled, (state, { payload }) => {
            state.harryData = payload
        });
        builder.addCase(getHarryVideosInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                state.harryInfo = payload
            }
        });
        builder.addCase(getBerryVideos.fulfilled, (state, { payload }) => {
            state.berryData = payload
        });
        builder.addCase(getBerryVideosInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                state.berryInfo = payload
            }
        });
        builder.addCase(getBombingVideos.fulfilled, (state, { payload }) => {
            state.bombingData = payload
        });
        builder.addCase(getBombingVideosInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                state.bombingInfo = payload
            }
        });
    },
})

export const playlistActions = playlistSlice.actions
export default playlistSlice.reducer