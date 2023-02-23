import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getFriaPlaylistInfo, getFriaPlaylists, playlistActions } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { IVideo } from '../type/videoProps'
import VideoLists from './VideoLists'

const Charts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:any) => state.video)
  const {allData } = useSelector((state:any) => state.playlist)
  const API_KEY = process.env.REACT_APP_API_KEY;
  const formatIdString = (list:IVideo[]) => {
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIdString = videoIdList?.join("");
    return videoIdString
  }
  const friaPlaylistId = formatIdString(allData!)
    useEffect(()=> {
      dispatch(getFriaPlaylists())
      dispatch(getFriaPlaylistInfo(friaPlaylistId))
  },[API_KEY ,dispatch, friaPlaylistId])
  const onClick = () => {
    dispatch(playlistActions.setSelectedVideos(wantedVideo))
  }
  return (
    <App>
      <Link to='/playlist'><button>전체 재생</button></Link>
      {wantedVideo.length > 0 ? <Link to='/playing' onClick={onClick}><button>내 목록 {wantedVideo.length}</button></Link> : ''}
      <Content>
        <ChartList>
          <VideoLists/>
        </ChartList>
      </Content>
    </App>
  )
}
const App = styled.div`
  margin-top: 60px;
  max-width : 100%;
`
const Content = styled.section`
  display: flex;
`

const ChartList = styled.div`
  flex: 1 1 30%;
  height : 735px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`

export default Charts