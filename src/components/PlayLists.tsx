import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { videoActions } from '../store/videoSlice';
import Video from './Video'
import VideoLists from './VideoLists'
import { AppDispatch } from '../store/store';
import '../components/Playlist.css'
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
    <div className='image-bg' >
      {selectedVideo && (
        <>
          <Video />
          <VideoLists />
        </>
      )}
    </div>
  )
}

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  z-index: -1;
`;

const Content = styled.div`
  width: 70%;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../data/플레이어 배경.png');
  border-radius: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


export default PlayLists