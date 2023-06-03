import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '../store/store'
import { videoActions } from '../store/videoSlice'
import { IVideo } from '../type/videoProps'
import Video from './Video'
import VideoItem from './VideoItem'

const PlayVideo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {wantedVideo } = useSelector((state:any) => state.video)
    const videoIndex = useSelector((state:any)=>state.video.index)
    const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
    useEffect(() => {
        dispatch(videoActions.setSelectedVideo(wantedVideo[videoIndex]))
    },[dispatch, videoIndex, wantedVideo])
  return (
    <>
      {selectedVideo && (
        <Video/>
      )}
      {wantedVideo?.map((video:IVideo,index:number) => (
        <VideoItem
            video={video}
            idx ={index}
            key={video.id}
        />
      ))}
    </>
  )
}

export default PlayVideo