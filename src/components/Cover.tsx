import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFriaPlaylistInfo, getFriaPlaylists, playlistActions } from '../store/playlistSlice'
import { videoActions } from '../store/videoSlice'
import Video from './Video'
import VideoLists from './VideoLists'

const Cover = () => {
  const dispatch = useDispatch()
  const {coverVideo,allVideos} = useSelector((state:any) => state.playlist)
  const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
  const videoIndex = useSelector((state:any)=>state.video.index)
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(coverVideo[videoIndex]))
    dispatch(playlistActions.setSelectedVideos(coverVideo))
  },[coverVideo, dispatch, videoIndex])
  console.log(allVideos)
  return (
    <App>
      <Content>
        {selectedVideo && (
          <Detail>
            <Video/>
          </Detail>
        )}
        <List>
          <VideoLists/>
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
export default Cover