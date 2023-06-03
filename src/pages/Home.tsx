import { useEffect } from 'react';
import React from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { getFriaPlaylistInfo, getFriaPlaylists, getLiveClip, getLiveClipInfo, playlistActions } from '../store/playlistSlice';
import { IVideo } from '../type/videoProps';
import { AppDispatch } from '../store/store';
import Weekly from '../components/Weekly';
import Latest from '../components/Latest';
import HomeImg from '../data/main.png'

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,clipData,coverVideo,liveClips} = useSelector((state:any) => state.playlist)
  const formatIdString = (list:IVideo[]) => {
    if (!list) return ''
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIdString = videoIdList?.join("");
    return videoIdString
  }
  const friaPlaylistId = formatIdString(allData!)
  const liveCliplistId = formatIdString(clipData!)
  useEffect(()=> {
    dispatch(getFriaPlaylists())
    dispatch(getFriaPlaylistInfo(friaPlaylistId))
    dispatch(getLiveClip())
    dispatch(getLiveClipInfo(liveCliplistId))
  },[dispatch, friaPlaylistId, liveCliplistId])

  useEffect(() => {
    let list:IVideo[] = []
    if (coverVideo && liveClips) {
      list = [...coverVideo , ...liveClips]  
      list.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))  
    }
    dispatch(playlistActions.setAllVideos(list))
  },[coverVideo, dispatch, liveClips])
  return (
    <Main>
      <ImgWrapper>
        <Img src={HomeImg} alt='bgimg'/>
      </ImgWrapper>
      <Weekly/> 
      <Latest/> 
    </Main>  
  )
}
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const Img = styled.img`
  width: 80%;
`
const Main = styled.div`
  margin-top : 10px;
`

export default Home
