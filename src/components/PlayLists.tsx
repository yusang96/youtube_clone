import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IPages } from '../type/pageProps';
import { IPlaylist } from '../type/playlistProps';
import { ISearched } from '../type/searchVideoProps';
import { IVideo } from '../type/videoProps';
import Video from './Video'
import VideoLists from './VideoLists'

const PlayLists = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const musiclistId = 'PLR2_QUSqS6X2FxXxOwq3uBRGj6luUoWBk'
    const [musicPlayLists , setMusicPlayLists] = useState([]);
    const [videos, setVideos] = useState([]);
    const [pages , setPages] = useState<IPages>();
    const [selectedVideo, setSelectedVideo] = useState<IPlaylist>();
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
            setPages(data);
            setMusicPlayLists(data.items);
        }
        const getVideoInfo = async (idLists:string) => {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${idLists}&key=${API_KEY}`)
            const data = await res.json();
            const sortedVideo = data?.items?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))
            setSelectedVideo(sortedVideo[0])
            setVideos(sortedVideo)
        }
        getPlayList(musiclistId)
        getVideoInfo(videoIDstring!)
    },[API_KEY, videoIDstring])
    const selectVideo = (video:IPlaylist) => {
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
  width : 100%;
`
const Content = styled.section`
  display: flex;
`
const Detail = styled.div`
    flex: 1 1 70%;
`
const List = styled.div`
    flex: 1 1 30%;
`

export default PlayLists