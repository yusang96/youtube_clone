import console from "console"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { ISearched } from "../type/searchVideoProps"

function Searched() {
    let date = new Date()
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [searchedList , setSearched] = useState([]);
    const {input} = useParams();

    useEffect(()=>{
      const getVideos = async (query:string) => {
        const api = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=10&order=viewCount&type=video&key=${API_KEY}`)
        const data = await api.json();
        setSearched(data.items);
      }
      getVideos(input!);
      },[API_KEY, input])
    return (
        <div className='Search'>
        {searchedList.map((video:ISearched)=> {
          return (
            <Video key={video.id.videoId} >
            <iframe width='500' height='300' src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`} allowFullScreen  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded youtube"></iframe>
            <Descript>
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}><h3 dangerouslySetInnerHTML={{ __html : video.snippet.title}}></h3></a>
              <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
              <p>{video.snippet.publishedAt.slice(0,10)}</p>
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