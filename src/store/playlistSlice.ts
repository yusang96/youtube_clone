import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../type/videoProps";

const API_KEY = process.env.REACT_APP_API_KEY;
const playlistFria = 'PLR2_QUSqS6X0vTlLq8R-eDSA7Ea1hpsWr'
const liveclip = 'PLBgSCwfdu8IMT2MoCc0qEKAa4Wi2h5_X2'
const friaplaylistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'


export const getFriaPlaylists = createAsyncThunk('get/friaPlaylists',
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistFria}&maxResults=10000&key=${API_KEY}`)
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
export const getFriaPlaylistInfo = createAsyncThunk('get/playlistsInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            return sortedVideo
          }
    })

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
export const getLiveClip = createAsyncThunk('get/live-clip',
    async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${liveclip}&maxResults=1000&key=${API_KEY}`)
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
export const getLiveClipInfo = createAsyncThunk('get/clipInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            return sortedVideo
          }
    })
export const getFriaWeeklyInfo = createAsyncThunk('get/weeklyInfo' ,
    async (idLists:string ) => {
        if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            return sortedVideo
          }
    })
interface IPlaylistProps {
    sort : string,
    allData : IVideo[],
    allVideos : IVideo[],
    prevData : IVideo[],
    weeklyData : IVideo[],
    coverVideo : IVideo[],
    friaMusic : IVideo[],
    friaData : IVideo[],
    friaPlaylist : IVideo[],
    clipData : IVideo[],
    liveClips : IVideo[]
}

const initialPlaylistState:IPlaylistProps = {
    sort : '누적순',
    allData : [],
    allVideos : [],
    prevData : [],
    weeklyData : [],
    coverVideo : [],
    friaMusic : [],
    friaData : [],
    friaPlaylist : [],
    clipData : [],
    liveClips : [],
}

const playlistSlice = createSlice({
    name : 'playlist',
    initialState : initialPlaylistState,
    reducers : {
        setAllVideos(state,action) {
            state.allVideos = action.payload
        },
        setPrevData(state,action) {
            state.prevData = action.payload
        },
        setWeeklyData(state,action) {
            state.weeklyData = action.payload
        },
        setSelectedVideos(state,action) {
            state.allVideos = action.payload
        },
        setSorted(state,action) {
            state.sort = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getFriaPlaylists.fulfilled, (state, { payload }) => {
            state.allData = payload
        });
        builder.addCase(getFriaPlaylistInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                state.allVideos = payload
                state.coverVideo = payload
            }
        });
        builder.addCase(getFriaWeeklyInfo.fulfilled, (state, { payload }) => {
            if (payload) {
                state.weeklyData = payload
            }
        });
        builder.addCase(getLiveClip.fulfilled, (state, { payload }) => {
            state.clipData = payload
        });
        builder.addCase(getLiveClipInfo.fulfilled , (state:IPlaylistProps, { payload }) => {         
            if (payload) {
                // state.allVideos = state.allVideos.concat(payload)
                state.liveClips = payload
            }
        });
    },
})

export const playlistActions = playlistSlice.actions
export default playlistSlice.reducer