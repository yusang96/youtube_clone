import { useEffect, useState } from 'react';
import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';


function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [videos , setVideos] = useState([]);
  useEffect(()=>{
    const getVideos = async () => {
      const api = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&regionCode=KR&chart=mostPopular&maxResults=12&key=${API_KEY}`)
      const data = await api.json();
      console.log(data.items);
      setVideos(data.items);
    }
    getVideos();
  },[API_KEY])
  const date = new Date();
  console.log(date);
    return (
        <Grid>
          {videos.map((video)=> {
          return ( 
            <Video key={video.id} >
              <iframe width='500' height='300' src={`https://www.youtube-nocookie.com/embed/${video.id}`} allowFullScreen  
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Embedded youtube"></iframe>
              <h3>{video.snippet.title}</h3>
              <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
              <p>{video.snippet.publishedAt.slice(0,10)}</p>
              <p>조회수 : {video.statistics.viewCount}</p>
            </Video>
          )
        })}
        </Grid>
    )
}
const Grid = styled.div`
    margin-top : 60px;
    display : grid;
    grid-template-columns : repeat(3 , minmax(20rem,1fr));
    grid-gap : 3rem;
    @media (max-width:768px) {
      grid-template-columns : repeat(2 , minmax(20rem,1fr));
      grid-gap : 3rem;
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
`;

export default Home