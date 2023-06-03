import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { videoActions } from '../store/videoSlice';
import Video from './Video'
import VideoLists from './VideoLists'
import { AppDispatch } from '../store/store';
import Bg from '../data/플레이어 배경.png'
const PlayLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allVideos} = useSelector((state:any) => state.playlist)
  const videoIndex = useSelector((state:any)=>state.video.index)
  const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(allVideos[videoIndex]))
  },[allVideos, dispatch, videoIndex])
  return (
    <Content>
      {selectedVideo && (
        <Video/>
      )}
      <VideoLists/>
    </Content>
  )
}

const Content = styled.div`
  width: 70%;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  /* background-image: url('../data/플레이어 배경.png'); 
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed; */
  background-color: black;
`


export default PlayLists