import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { playlistActions } from '../store/playlistSlice';
import { videoActions } from '../store/videoSlice';
import { IVideo } from '../type/videoProps';
import Video from './Video'
import VideoLists from './VideoLists'
import { getHarryVideos,getHarryVideosInfo } from '../store/playlistSlice';
import { AppDispatch } from '../store/store';

const PlayLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const videoIndex = useSelector((state:any)=>state.video.index)
  const selectedVideo = useSelector((state:any) => state.video.selectedVideo)
  const { music , harry,berry,bombing,harryData, harryInfo} = useSelector((state:any) => state.playlist)
  const API_KEY = process.env.REACT_APP_API_KEY;
  const friaplaylistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'
  const harryPlayListId ='PLK9rW7UvhqXY05BfQgtLx_e0DJEwAkSE7'
  const berryPlayListId = 'PLIWPn8Vlm2Bm-FRmYH-rvG8EHhVU4fmLX'
  const bombingPlayListId = 'PLdpjCrUcXsVQl5lQCUGsHs-yeM0X6hXNn'
  const [musicPlayLists , setMusicPlayLists] = useState([]);
  const [berryPlayLists , setBerryPlayLists] = useState([]);
  const [bombingPlayLists , setBombingPlayLists] = useState([]);
  const formatIdString = (list:IVideo[]) => {
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIDstring = videoIdList?.join("");
    return videoIDstring
  }
  const friaVideoIdList = formatIdString(musicPlayLists!)
  const harryVideoIdList = formatIdString(harryData!)
  const berryVideoIdList = formatIdString(berryPlayLists!)
  const bombingVideoIdList = formatIdString(bombingPlayLists!)
    useEffect(()=> {
      const getPlayList = async (id:string) => {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
          const data = await res.json();
          setMusicPlayLists(data.items);
      }
      const getBerryPlayList = async (id:string) => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
        const data = await res.json();
        const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
        setBerryPlayLists(filteredData);
      }
      const getBombingPlayList = async (id:string) => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
        const data = await res.json();
        const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
        setBombingPlayLists(filteredData);
      }
      const getVideoInfo = async (idLists:string) => {
        if (idLists) {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
          const data = await res.json();
          const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
          dispatch(playlistActions.setMusic(sortedVideo))
        }
      }
    const getBerryVideo =  async (idLists:string) => {
      if (idLists) {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
        const data = await res.json();
        dispatch(playlistActions.setBerryMusic(data.items))
      }
    }
    const getBombingVideo =  async (idLists:string) => {
      if (idLists) {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
        const data = await res.json();
        dispatch(playlistActions.setBombingMusic(data.items))
      }
    }
    dispatch(getHarryVideos(harryPlayListId))
    dispatch(getHarryVideosInfo(harryVideoIdList))
    getPlayList(friaplaylistId)
    getBerryPlayList(berryPlayListId)
    getBombingPlayList(bombingPlayListId)
    getVideoInfo(friaVideoIdList!)
    getBerryVideo(berryVideoIdList)
    getBombingVideo(bombingVideoIdList)
  },[API_KEY, berryVideoIdList, bombingVideoIdList, dispatch, friaVideoIdList, harryVideoIdList])
  let coverVideos = [...music,...harry,...berry,...bombing].sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
  useEffect(() => {
    dispatch(videoActions.setSelectedVideo(coverVideos[videoIndex]))
  },[coverVideos, dispatch, videoIndex])
  console.log(harryInfo)
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