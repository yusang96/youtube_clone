import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [videos , setVideos] = useState([]);
  useEffect(()=>{
    getVideos();
  },[])
  const date = new Date();
  console.log(date);
  const getVideos = async () => {
    const api = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${API_KEY}`)
    const data = await api.json();
    console.log(data.items);
    setVideos(data.items);
  }

    return (
      
        <div className='Home'>
          {videos.map((video)=> {
          return (
            <div key={video.id} >
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={video.channelId} />
              <a href={`https://www.youtube.com/watch?v=${video.id}`}><h3 dangerouslySetInnerHTML={{ __html : video.snippet.title}}></h3></a>
              <p>{video.snippet.channelTitle}</p>
              <p>{video.snippet.publishTime}</p>
            </div>
          )
        })}
        </div>
     
    )
}

export default Home