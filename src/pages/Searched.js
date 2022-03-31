import {React,  useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function Searched() {
    let date = new Date()
    console.log(date)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [searchs , setSearched] = useState([]);
    let params = useParams();
    const getVideos = async (name) => {
      const api = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&maxResults=10&order=viewCount&key=${API_KEY}`)
      const data = await api.json();
      console.log(data.items);
      setSearched(data.items);
    }
    useEffect(()=>{
        getVideos(params.input);
        console.log(params.input)
      },[params.input])
    return (
        <div className='Search'>
        {searchs.map((video)=> {
        return (
          <div key={video.id.videoId} >
            <img src={`https://i.ytimg.com/vi/${video.id.videoId}/hqdefault.jpg`} alt={video.channelId} />
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}><h3 dangerouslySetInnerHTML={{ __html : video.snippet.title}}></h3></a>
            <p>{video.snippet.channelTitle}</p>
            <p>{date.getFullYear() > video.snippet.publishTime.slice(0,4) ? date.getFullYear() -video.snippet.publishTime.slice(0,4)+"년전" :
                    date.getFullYear() - video.snippet.publishTime.slice(0,4) === 1 ? date.getMonth() + video.snippet.publishTime.slice(5,7) +'개월전':
                    date.getFullYear() === video.snippet.publishTime.slice(0,4) && date.getMonth() > video.snippet.publishTime(5,7)? date.getMonth() - video.snippet.publishTime.slice(5,7) +'개월전': 
                    video.snippet.publishTime.slice(8,10)-date.getDay() +'일전'}</p>
          </div>
        
        )
      })}
      </div>
    )
}

export default Searched