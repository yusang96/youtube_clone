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
    <App>
      <Content>
        {selectedVideo && (
            <Detail>
              <Video/>
            </Detail>
        )}
        <List>
            {wantedVideo?.map((video:IVideo,index:number) => (
              <VideoItem
                  video={video}
                  idx ={index}
                  key={video.id}
              />
            ))}
        </List>
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
const Detail = styled.div`
  flex: 1 1 70%;
`
const List = styled.div`
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

export default PlayVideo