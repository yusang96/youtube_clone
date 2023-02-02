import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ISearched } from '../type/searchVideoProps';
import { IVideo } from '../type/videoProps';
import Video from './Video'
import VideoLists from './VideoLists'

const PlayLists = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const musiclistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'
    const harryPlayListId ='PLK9rW7UvhqXY05BfQgtLx_e0DJEwAkSE7'
    const berryPlayListId = 'PLIWPn8Vlm2Bm-FRmYH-rvG8EHhVU4fmLX'
    const bombingPlayListId = 'PLdpjCrUcXsVQl5lQCUGsHs-yeM0X6hXNn'
    const [musicPlayLists , setMusicPlayLists] = useState([]);
    const [harryPlayLists , setHarryPlayLists] = useState([]);
    const [harryVideoLists, setHarrayVideoLists] =useState([]);
    const [berryPlayLists , setBerryPlayLists] = useState([]);
    const [berryVideoLists, setBerryVideoLists] =useState([]);
    const [bombingPlayLists , setBombingPlayLists] = useState([]);
    const [bombingVideoLists, setBombingVideoLists] =useState([]);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<IVideo>();
    const [index , setIndex] = useState(0);
    const formatIdString = (list:IVideo[]) => {
      let videoIdList:string[] = []
      list?.map((x) => (
            videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
          ));
      let videoIDstring = videoIdList?.join("");
      return videoIDstring
    }
    const friaVideoIdList = formatIdString(musicPlayLists!)
    const harryVideoIdList = formatIdString(harryPlayLists!)
    const berryVideoIdList = formatIdString(berryPlayLists!)
    const bombingVideoIdList = formatIdString(bombingPlayLists!)
    useEffect(()=> {
        const getPlayList = async (id:string) => {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            setMusicPlayLists(data.items);
        }
        const getHarryPlayList = async (id:string) => {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
          const data = await res.json();
          const filteredData = await data.items.filter((item:any) =>item.snippet.description !== "This video is private.")
          setHarryPlayLists(filteredData);
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
              setSelectedVideo(sortedVideo[0])
              setVideos(sortedVideo)
            }
        }
        const getHarryVideo =  async (idLists:string) => {
          if (idLists) {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            setHarrayVideoLists(data.items)
          }
      }
      const getBerryVideo =  async (idLists:string) => {
        if (idLists) {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
          const data = await res.json();
          setBerryVideoLists(data.items)
        }
      }
      const getBombingVideo =  async (idLists:string) => {
        if (idLists) {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics${idLists}&key=${API_KEY}`)
          const data = await res.json();
          setBombingVideoLists(data.items)
        }
      }
        getPlayList(musiclistId)
        getHarryPlayList(harryPlayListId)
        getBerryPlayList(berryPlayListId)
        getBombingPlayList(bombingPlayListId)
        getVideoInfo(friaVideoIdList!)
        getHarryVideo(harryVideoIdList!)
        getBerryVideo(berryVideoIdList)
        getBombingVideo(bombingVideoIdList)
    },[API_KEY, berryVideoIdList, bombingVideoIdList, friaVideoIdList, harryVideoIdList])
    const selectVideo = (video:IVideo) => {
      setSelectedVideo(video);
    };
    const selectVideoIndex = (index :number) => {
      setIndex(index);
    }
    let newVideos = [...videos,...harryVideoLists,...berryVideoLists,...bombingVideoLists].sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
  
  return (
    <App>
      <Content>
        {selectedVideo && (
          <Detail>
            <Video video={selectedVideo} videos={newVideos} idx={index}/>
          </Detail>
        )}
        <List>
          <VideoLists
            videos={newVideos}
            onVideoClick={selectVideo}
            onVideoIndex ={selectVideoIndex}
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