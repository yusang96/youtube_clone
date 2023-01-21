import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IPages } from '../type/pageProps';
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
    const [selectedVideo, setSelectedVideo] = useState();
    let videoIdList = [] as string[]
    musicPlayLists.map((x:ISearched) => {
        return (
            videoIdList.push("&id=" + x.snippet.resourceId.videoId)
        )
        });
    let videoIDstring = videoIdList.join("");
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
            setVideos(data.items)
        }
        getPlayList(musiclistId)
        getVideoInfo(videoIDstring)
    },[API_KEY, videoIDstring])
    const selectVideo = (video:any) => {
        setSelectedVideo(video);
      };
    if (videos) {
        console.log(videos[0])
    }
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
            videos={videos?.sort((a:IVideo,b:IVideo) => parseInt(b.statistics.viewCount)-parseInt(a.statistics.viewCount))}
            onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </List>
      </Content>
    </App>
  )
}
const App = styled.div`
     max-width: 80rem;
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