import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { videoActions } from '../store/videoSlice';
import { IVideo } from '../type/videoProps';
import Video from './Video'
import VideoLists from './VideoLists'
import { getHarryVideos,getHarryVideosInfo,getBerryVideos,getBerryVideosInfo,getBombingVideos,getBombingVideosInfo,getFriaVideos,getFriaVideosInfo} from '../store/playlistSlice';
import { AppDispatch } from '../store/store';

const PlayLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const videoIndex = useSelector((state:any)=>state.video.index)
  const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
  const {friaData,friaPlaylist,harryData, harryInfo,berryData,berryInfo,bombingData,bombingInfo,allVideos } = useSelector((state:any) => state.playlist)
  const API_KEY = process.env.REACT_APP_API_KEY;
  const formatIdString = (list:IVideo[]) => {
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIDstring = videoIdList?.join("");
    return videoIDstring
  }
  const friaVideoIdList = formatIdString(friaData!)
  const harryVideoIdList = formatIdString(harryData!)
  const berryVideoIdList = formatIdString(berryData!)
  const bombingVideoIdList = formatIdString(bombingData!)
    useEffect(()=> {
      dispatch(getFriaVideos())
      dispatch(getFriaVideosInfo(friaVideoIdList))
      dispatch(getHarryVideos())
      dispatch(getHarryVideosInfo(harryVideoIdList))
      dispatch(getBerryVideos())
      dispatch(getBerryVideosInfo(berryVideoIdList))
      dispatch(getBombingVideos())
      dispatch(getBombingVideosInfo(bombingVideoIdList))
  },[API_KEY, berryVideoIdList, bombingVideoIdList, dispatch, friaVideoIdList, harryVideoIdList])
  let coverVideos = [...friaPlaylist,...harryInfo!,...berryInfo!,...bombingInfo!].sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(coverVideos[videoIndex]))
  },[coverVideos, dispatch, videoIndex])
  return (
    <App>
      <Content>
        {selectedVideo && (
          <Detail>
            <Video videos={coverVideos}/>
          </Detail>
        )}
        <List>
          <VideoLists
            videos={coverVideos}
          />
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

export default PlayLists