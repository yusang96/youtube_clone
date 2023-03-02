import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { playlistActions } from '../store/playlistSlice'
import { IVideo } from '../type/videoProps'
import VideoItem from './VideoItem'

const VideoLists = () => {
  const dispatch = useDispatch()
  const {allVideos} = useSelector((state:any) => state.playlist)
  return (
    <Lists>
      {allVideos?.map((video:IVideo,index:number) => (
        <VideoItem
          video={video}
          idx ={index}
          key={video.id}
        />
    ))}
  </Lists>
  )
}

const Lists = styled.ul`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

export default React.memo(VideoLists)