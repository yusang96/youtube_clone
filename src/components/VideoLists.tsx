import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { playlistActions } from '../store/playlistSlice'
import { IVideo } from '../type/videoProps'
import VideoItem from './VideoItem'

const VideoLists = () => {
  const {allVideos} = useSelector((state:any) => state.playlist)
  return (
    <Wrapper>
      <Title>Playlist</Title>
      <Lists>
        {allVideos?.map((video:IVideo,index:number) => (
          <VideoItem
            video={video}
            idx ={index}
            key={video.id}
          />
      ))}
      </Lists>
    </Wrapper>
  )
}
const Title = styled.h1`
  margin-left:10px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
`

const Lists = styled.ul`
  padding : 10px;
  height : 400px;
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

export default React.memo(VideoLists)