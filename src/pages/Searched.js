import {React,  useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

function Searched() {
    let date = new Date()
    console.log(date)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [searchs , setSearched] = useState([]);
    let params = useParams();
    useEffect(()=>{
      const getVideos = async (name) => {
        const api = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&maxResults=10&order=viewCount&type=video&key=${API_KEY}`)
        const data = await api.json();
        console.log(data.items);
        setSearched(data.items);
      }
        getVideos(params.input);
      },[API_KEY, params, params.input])
    return (
        <div className='Search'>
        {searchs.map((video)=> {
        return (
          <Video key={video.id.videoId} >
            <iframe width='500' height='300' src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`} allowFullScreen  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded youtube"></iframe>
            <Descript>
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}><h3 dangerouslySetInnerHTML={{ __html : video.snippet.title}}></h3></a>
              <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
              <p>{date.getFullYear() > video.snippet.publishTime.slice(0,4) ? date.getFullYear() -video.snippet.publishTime.slice(0,4)+"년전" :
                      date.getFullYear() - video.snippet.publishTime.slice(0,4) === 1 ? date.getMonth() + video.snippet.publishTime.slice(5,7) +'개월전':
                      date.getFullYear() === video.snippet.publishTime.slice(0,4) && date.getMonth() > video.snippet.publishTime(5,7)? date.getMonth() - video.snippet.publishTime.slice(5,7) +'개월전': 
                      video.snippet.publishTime.slice(8,10)-date.getDay() +'일전'}</p>
            </Descript>
          </Video>
        
        )
      })}
      </div>
    )
}

const Video = styled.div`
  display : flex;
  margin-top : 60px;
`

const Descript = styled.div`
  margin-left : 20px;
`

export default Searched