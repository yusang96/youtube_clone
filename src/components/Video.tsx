import React, { IframeHTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import ReactPlayer from 'react-player/lazy'

const Video = ({video,videos}:{video:IVideo,videos:IVideo[]} ) => {
  console.log(videos)
  const videoRef = useRef<ReactPlayer>(null)
  const [nowIndex , setNowIndex] = useState(0);
  const [isPlaying , setIsPlaying] = useState(false)
  const [volume , setVolume] = useState(0.3)
  const [isMuted , setIsMuted] = useState(false);
  const [elapsedTime , setElapsedTime] = useState(0);
  const [progressBar , setProgressBar] = useState(0);
  const totalTime = videoRef && videoRef.current ? videoRef.current.getDuration() : 0
  const togglePlaying = () => {
    setIsPlaying(prev => !prev)
  }
  const backwardBtn = () => {
    videoRef?.current?.seekTo(videoRef.current.getCurrentTime()-5)
  }
  const forwardBtn = () => {
    videoRef?.current?.seekTo(videoRef.current.getCurrentTime()+5)
  }
  const onVolumeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value)/100)
  }
  const handleNextVideo = () => {
    if (nowIndex === videos.length -1 ) {
      setNowIndex(0)
    } 
    setNowIndex(prev => prev+1)
  }
  useEffect(() => {
    setProgressBar((elapsedTime/totalTime) * 100)
  },[elapsedTime, totalTime])
  console.log(progressBar)
  console.log(elapsedTime,nowIndex)
  return (
    <Detail>
      <Thumbnails src={videos[nowIndex]?.snippet.thumbnails.maxres.url} alt='qew'/>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube-nocookie.com/embed/${videos[nowIndex]?.id}`} 
        width='100%'
        height='500px'
        volume={volume}
        muted={isMuted}
        playing={isPlaying}
        onProgress = {(progress:any) => setElapsedTime(progress.playedSeconds)}
        onEnded ={handleNextVideo}
        style={{display : 'none'}}
        />
    <Info>
      <h3>{videos[nowIndex]?.snippet?.title}</h3>
      <h4>{videos[nowIndex]?.snippet?.channelTitle}</h4>
      <h4>{videos[nowIndex]?.snippet?.publishedAt.slice(0,10)}</h4>
      <h4>{videos[nowIndex]?.statistics?.viewCount}회</h4>
      <div style={{display:'flex'}}>
        <button onClick={backwardBtn}>왼쪽</button>
        <button onClick={togglePlaying}>{isPlaying ? '멈춤' : "재생"}</button>
        <button onClick={forwardBtn}>오른쪽</button>
        <input type='range' value={volume * 100} min='0' max='100' onChange={onVolumeChange} step='10'/>
        <input type='range' value={progressBar} min='0' max='100' />
      </div>
    </Info>
    </Detail>
  )
}

const Thumbnails = styled.img`
  width : 100%;
  height: 500px;
`

const Detail = styled.div`
  padding: 0.2em;
`

const Info = styled.div`
  white-space: pre-wrap;
`
const ProgressBar = styled.div`
  position: "absolute";
  width: "100%";
  height: "5px";
  background-color: grey;
`
const ProgressGauge = styled.div`
  height: "5px";
  background-color: 'red';
`

export default React.memo(Video)