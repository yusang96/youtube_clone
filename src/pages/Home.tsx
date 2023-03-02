import { useEffect, useState } from 'react';
import React from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { getFriaPlaylistInfo, getFriaPlaylists, getLiveClip, getLiveClipInfo, playlistActions } from '../store/playlistSlice';
import { IVideo } from '../type/videoProps';
import { AppDispatch } from '../store/store';
import Weekly from '../components/Weekly';

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,clipData,coverVideo,liveClips} = useSelector((state:any) => state.playlist)
  const formatIdString = (list:IVideo[]) => {
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
  },[ dispatch, friaPlaylistId, liveCliplistId])
  useEffect(() => {
    dispatch(playlistActions.setAllVideos([...coverVideo , ...liveClips]))
    localStorage.setItem('todayData' , JSON.stringify([...coverVideo , ...liveClips]))
  },[coverVideo, dispatch, liveClips])
  return (
    <Main>
      <Weekly/>
    </Main>
    // <Grid>
    //   <VideoLists/>
    // </Grid>
  )
}
const Main = styled.div`
  margin-top : 60px;
`
const Grid = styled.div`
    margin-top : 60px;
    display : grid;
    grid-template-columns : repeat(4 , minmax(20rem,1fr));
    grid-gap : 3rem;
    @media (max-width:768px) {
      grid-template-columns : repeat(2 , minmax(20rem,1fr));
      grid-gap : 30px;
    }
`;
const Video = styled.div`
    a {
        text-decoration : none;
    }
    h3 {
        text-align : center;
        padding : 20px;
    }
    display : flex;
    flex-direction: column;
`;

export default Home
