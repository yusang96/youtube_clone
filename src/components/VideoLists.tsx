import React from 'react'
import styled from 'styled-components'
import { IPlaylist } from '../type/playlistProps'
import { IVideo } from '../type/videoProps'
import VideoItem from './VideoItem'

const VideoLists = ({videos,onVideoClick}:any) => {
  return (
    <Lists>
    {videos?.map((video:IVideo) => (
      <VideoItem
        key={video.id}
        video={video}
        onVideoClick={onVideoClick}
      />
    ))}
  </Lists>
  )
}

const Lists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

export default VideoLists