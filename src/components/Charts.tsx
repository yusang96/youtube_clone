import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {  playlistActions } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { videoActions } from '../store/videoSlice'
import VideoLists from './VideoLists'
import DailyCharts from './DailyCharts'
import WeeklyChart from './WeeklyChart'

const Charts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {wantedVideo } = useSelector((state:any) => state.video)
  const {liveClips,coverVideo,allVideos,sort} = useSelector((state:any) => state.playlist)
  useEffect(() => {
    dispatch(videoActions.currentIndex(''))
    dispatch(playlistActions.setAllVideos([ ...coverVideo , ...liveClips]))
  },[coverVideo, dispatch, liveClips])
  const onClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setSelectedVideos(wantedVideo))
  }
  const onAllClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setSelectedVideos(allVideos))
  }
  const onSortedBtn = useCallback(() => {
    const nowSortType = sort === '누적순' ? '일간순' : '누적순';
    dispatch(playlistActions.setSorted(nowSortType))
  },[dispatch, sort])
  return (
    <App>
      <Link to='/playlist' onClick={onAllClick}><button>전체 재생</button></Link>
      <button onClick={onSortedBtn}>일간</button>
      <button onClick={onSortedBtn}>누적</button>
      {wantedVideo.length > 0 ? <Link to='/mylist' onClick={onClick}><button>내 목록 {wantedVideo.length}</button></Link> : ''}
      <Content>
        <ChartList>
          {sort ==='누적순' && <VideoLists/>}
          {sort === '일간순' && <WeeklyChart/>}
        </ChartList>
      </Content>
    </App>
  )
}
const App = styled.div`
  margin-top: 60px;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.section`
  width: 100%;
  height : 500px;
  margin: 0 10px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`

const ChartList = styled.div`
  width : 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
`

export default Charts