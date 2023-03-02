import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {  playlistActions } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { videoActions } from '../store/videoSlice'
import VideoLists from './VideoLists'
import WeeklyCharts from './WeeklyCharts'

const Charts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:any) => state.video)
  const {liveClips,coverVideo,allVideos,sort} = useSelector((state:any) => state.playlist)
  useEffect(() => {
    dispatch(videoActions.currentIndex(''))
    dispatch(playlistActions.setAllVideos([ ...coverVideo , ...liveClips]))
  },[coverVideo, dispatch, liveClips])
  const onClick = () => {
    dispatch(playlistActions.setSelectedVideos(wantedVideo))
  }
  const onAllClick = () => {
    dispatch(playlistActions.setSelectedVideos(allVideos))
  }
  const onSortedBtn = useCallback(() => {
    sort === '누적순' ? dispatch(playlistActions.setSorted('주간순')) : dispatch(playlistActions.setSorted('누적순'))
  },[dispatch, sort])
  return (
    <App>
      <Link to='/playlist' onClick={onAllClick}><button>전체 재생</button></Link>
      <button onClick={onSortedBtn}>주간</button>
      <button onClick={onSortedBtn}>누적</button>
      {wantedVideo.length > 0 ? <Link to='/mylist' onClick={onClick}><button>내 목록 {wantedVideo.length}</button></Link> : ''}
      <Content>
        <ChartList>
          {sort ==='누적순' && <VideoLists/>}
          {sort === '주간순' && <WeeklyCharts/>}
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