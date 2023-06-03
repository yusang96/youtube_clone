import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getFriaPlaylistInfo, getFriaPlaylists, playlistActions } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { videoActions } from '../store/videoSlice'
import { IVideo } from '../type/videoProps'
import Video from './Video'
import VideoLists from './VideoLists'

const Cover = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {coverVideo,allData,allVideos} = useSelector((state:any) => state.playlist)
  const {wantedVideo } = useSelector((state:any) => state.video)
  const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
  const videoIndex = useSelector((state:any)=>state.video.index)
  const formatIdString = (list:IVideo[]) => {
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIdString = videoIdList?.join("");
    return videoIdString
  }
  const friaPlaylistId = formatIdString(allData!)
  const onClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setSelectedVideos(wantedVideo))
  }
  const onAllClick = () => {
    dispatch(videoActions.currentIndex(0))
    dispatch(playlistActions.setSelectedVideos(allVideos))
  }
  useEffect(()=> {
    dispatch(videoActions.currentIndex(''))
    dispatch(getFriaPlaylists())
    dispatch(getFriaPlaylistInfo(friaPlaylistId))
    if (coverVideo) {
      dispatch(videoActions.setSelectedVideo(coverVideo[videoIndex]))
      dispatch(playlistActions.setSelectedVideos(coverVideo))
    } 
  },[coverVideo, dispatch, friaPlaylistId, videoIndex])
  return (
    <App>
      <Link to='/playlist' onClick={onAllClick}><button>전체 재생</button></Link>
      {wantedVideo.length > 0 ? <Link to='/mylist' onClick={onClick}><button>내 목록 {wantedVideo.length}</button></Link> : ''}
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