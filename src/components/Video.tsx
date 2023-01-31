import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import ReactPlayer from 'react-player/lazy'
import MuteSpeaker from '../data/Mute_Icon.svg'
import Speaker from '../data/Speaker_Icon.svg'
const Video = ({video,videos}:{video:IVideo,videos:IVideo[]} ) => {
  console.log(videos)
  const videoRef = useRef<ReactPlayer>(null)
  const [nowIndex , setNowIndex] = useState(0);
  const [isPlaying , setIsPlaying] = useState(false)
  const [volume , setVolume] = useState(0.3)
  const [isMuted , setIsMuted] = useState(false);
  const [elapsedTime , setElapsedTime] = useState(0);
  const [progressBar , setProgressBar] = useState(0);
  const [currentSeek, setCurrentSeek] =useState(0);
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
    const newValue = parseInt(e.target.value)/100
    setVolume(newValue)
    newValue === 0 ? setIsMuted(true) : setIsMuted(false)
  }
  const handleNextVideo = () => {
    if (nowIndex === videos.length -1 ) {
      setNowIndex(0)
    } 
    setNowIndex(prev => prev+1)
  }
  const onSeekChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSeek(parseInt(e.target.value))
    videoRef.current?.seekTo(currentSeek)
  }
  const onMutedToggle = () => {
    setIsMuted(prev => !prev)
  }
  useEffect(() => {
    setProgressBar((elapsedTime/totalTime) * 100)
  },[elapsedTime, totalTime, volume])
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
        <ProgressBar>
          <ProgressGauge style={{width : `${progressBar}%`}}/>
        </ProgressBar>
    <Info>
      <h3>{videos[nowIndex]?.snippet?.title}</h3>
      <h4>{videos[nowIndex]?.snippet?.channelTitle}</h4>
      <h4>{videos[nowIndex]?.snippet?.publishedAt.slice(0,10)}</h4>
      <h4>{videos[nowIndex]?.statistics?.viewCount}회</h4>
      <div style={{display:'flex'}}>
        <button onClick={backwardBtn}>왼쪽</button>
        <button onClick={togglePlaying}>{isPlaying ? '멈춤' : "재생"}</button>
        <button onClick={forwardBtn}>오른쪽</button>
        <div style={{display : 'flex'}}>
          {isMuted ? <img src={MuteSpeaker} alt='muted' style={{width :'30px', height : '30px'}} onClick={() => onMutedToggle()}/> : <img src={Speaker} alt='speaker' style={{width :'30px', height : '30px'}} onClick={() => onMutedToggle()}/>}
          <input type='range' value={isMuted ? 0 : volume * 100} min='0' max='100' onChange={onVolumeChange} step='10'/>
        </div>
        <input type='range' min={0} max={totalTime ? totalTime : 0} value={elapsedTime} onChange={onSeekChange}/>
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
`

const Info = styled.div`
  white-space: pre-wrap;
`
const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  background-color: grey;
`
const ProgressGauge = styled.div`
  height: 7px;
  background-color: red;
`

export default React.memo(Video)