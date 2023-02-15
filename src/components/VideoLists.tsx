import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import VideoItem from './VideoItem'

const VideoLists = () => {
  const {allVideos } = useSelector((state:any) => state.playlist)
  return (
    <Lists>
    {allVideos?.map((video:IVideo,index:number) => (
      <VideoItem
        key={video.id}
        video={video}
        idx ={index}
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