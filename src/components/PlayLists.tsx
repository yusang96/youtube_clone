import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ISearched } from '../type/searchVideoProps';
import { IVideo } from '../type/videoProps';
import Video from './Video'
import VideoLists from './VideoLists'

const PlayLists = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const musiclistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'
    const [musicPlayLists , setMusicPlayLists] = useState([]);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<IVideo>();
    let videoIdList:string[] = []
    musicPlayLists?.map((x:ISearched) => {
        return (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        )
      });
    let videoIDstring = videoIdList?.join("");
    useEffect(()=> {
        const getPlayList = async (id:string) => {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${API_KEY}`)
            const data = await res.json();
            setMusicPlayLists(data.items);
        }
        const getVideoInfo = async (idLists:string) => {
            if (idLists) {
              const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${idLists}&key=${API_KEY}`)
              const data = await res.json();
              const sortedVideo = await data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
              setSelectedVideo(sortedVideo[0])
              setVideos(sortedVideo)
            }
        }
        getPlayList(musiclistId)
        getVideoInfo(videoIDstring!)
    },[API_KEY, videoIDstring])
    const selectVideo = (video:IVideo) => {
      setSelectedVideo(video);
    };
  return (
    <App>
      <Content>
        {selectedVideo && (
          <Detail>
            <Video video={selectedVideo} />
          </Detail>
        )}
        <List>
          <VideoLists
            videos={videos}
            onVideoClick={selectVideo}
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