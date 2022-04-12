import { useEffect, useState } from 'react';
import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [videos , setVideos] = useState([]);
  useEffect(()=>{
    getVideos();
  },[])
  const date = new Date();
  console.log(date);
  const getVideos = async () => {
    const api = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&regionCode=KR&chart=mostPopular&maxResults=12&key=${API_KEY}`)
    const data = await api.json();
    console.log(data.items);
    setVideos(data.items);
  }

    return (
      
        <Grid>
          {videos.map((video)=> {
          return (
            <Video key={video.id} >
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={video.channelId} />
              <a href={`https://www.youtube.com/watch?v=${video.id}`}><h3 dangerouslySetInnerHTML={{ __html : video.snippet.title}}></h3></a>
              <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
              <p>{parseInt(video.snippet.publishedAt)}년</p>
              <p>조회수 : {video.statistics.viewCount}</p>
              <p>좋아요 : {video.statistics.likeCount}</p>
              <p>댓글 : {video.statistics.commentCount}</p>
            </Video>
          )
        })}
        </Grid>
     
    )
}
const Grid = styled.div`
    margin-top : 60px;
    display : grid;
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 3rem;
`;
const Video = styled.div`
    img {
        width:100%;
        text-align : center;
        border-radius : 20px;
    }
    a {
        text-decoration : none;
    }
    h3 {
        text-align : center;
        padding : 20px;
    }
`;

export default Home