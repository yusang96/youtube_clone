import React from 'react'
import styled from 'styled-components'
import VideoItem from './VideoItem'

const VideoLists = ({videos,onVideoClick,display}:any) => {
  return (
    <Lists>
    {videos?.map((video:any) => (
      <VideoItem
        key={video.id}
        video={video}
        onVideoClick={onVideoClick}
        display={display}
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