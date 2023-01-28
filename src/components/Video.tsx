import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import ReactPlayer from 'react-player/lazy'

const Video = ({video}:{video:IVideo}) => {
  console.log(video)
  const videoRef = useRef() as any
  const [isPlaying , setIsPlaying] = useState(false)
  const [volume , setVolume] = useState(0.3)
  const [isMuted , setIsMuted] = useState(false);
  
  const duration = videoRef && videoRef.current ? videoRef.current.getDuration() : "00:00";
  const togglePlaying = () => {
    setIsPlaying(prev => !prev)
  }
  const backwardBtn = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime()-5)
  }
  const forwardBtn = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime()+5)
  }
  useEffect(() => {
    let currentTime = videoRef.current.getCurrentTime();
    const elapsedTime = parseInt(duration) - parseInt(currentTime)
    console.log(parseInt(currentTime),duration,parseInt(elapsedTime/60 as any) ,parseInt(elapsedTime%60 as any) )
  },[duration])
  return (
    <Detail>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube-nocookie.com/embed/${video.id}`} 
        width='100%'
        height='500px'
        volume={volume}
        muted={isMuted}
        playing={isPlaying}/>
    <Info>
      <h3>{video?.snippet?.title}</h3>
      <h4>{video?.snippet?.channelTitle}</h4>
      <h4>{video?.snippet?.publishedAt.slice(0,10)}</h4>
      <h4>{video?.statistics?.viewCount}회</h4>
      <div style={{display:'flex'}}>
        <button onClick={backwardBtn}>왼쪽</button>
        <button onClick={togglePlaying}>{isPlaying ? '멈춤' : "재생"}</button>
        <button onClick={forwardBtn}>오른쪽</button>
        <input type='range' value={volume * 100} min='0' max='100' onChange={(e:any) => setVolume(parseFloat(e.target.value/100 as any))} step='0.1'/>
      </div>
    </Info>
    </Detail>
  )
}

const Detail = styled.div`
    padding: 0.2em;
`

const Info = styled.div`
    white-space: pre-wrap;
`

export default React.memo(Video)