import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import ReactPlayer from 'react-player/lazy'
import MuteSpeaker from '../data/Mute_Icon.svg'
import Speaker from '../data/Speaker_Icon.svg'
import Play from '../data/play.svg'
import Pause from '../data/pause.svg'
import Prev from '../data/prev.svg'
import Next from '../data/next.svg'
import Loop from '../data/loop-69.svg'
import NotLoop from '../data/loop-none.svg'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/exports'
import { videoActions } from '../store/videoSlice'
import { RootState } from '../store/store'

const Video = ({videos}:{videos:IVideo[]} ) => {
  const dispatch = useDispatch()
  const {isPlaying,isMuted,volume,isLoop,isRandom,elapsedTime,currentSeek,duration} = useSelector((state:RootState) => state.video)
  const videoIndex = useSelector((state:any) => state.video.index)
  const videoRef = useRef<ReactPlayer>(null)
  const totalTime = videoRef && videoRef.current ? videoRef.current.getDuration() : 0
  const togglePlaying = () => {
    dispatch(videoActions.setIsPlaying())
  }
  const backwardBtn = () => {
    videoRef?.current?.seekTo(videoRef.current.getCurrentTime()-5)
  }
  const forwardBtn = () => {
    videoRef?.current?.seekTo(videoRef.current.getCurrentTime()+5)
  }
  const onVolumeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)/100
    dispatch(videoActions.setVolume(newValue))
  }
  const handleNextVideo = () => {
    if (videoIndex === videos.length -1 ) {
      dispatch(videoActions.currentIndex(0))
    } else if (isRandom) {
      let randomIndex = Math.floor(Math.random() * videos.length)
      dispatch(videoActions.currentIndex(randomIndex))
    } else {
      dispatch(videoActions.currentIndex(videoIndex+1))
    }
  }
  const handlePrevVideo = () => {
    if (videoIndex > 0) {
      dispatch(videoActions.currentIndex(videoIndex-1))
    }
  }
  const onSeekChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(videoActions.setCurrentSeek(parseInt(e.target.value)))
    videoRef.current?.seekTo(currentSeek)
  }
  const onMutedToggle = () => {
    dispatch(videoActions.setIsMuted(null))
  }
  const onToggleLoop = () => {
    dispatch(videoActions.setIsLoop())
  }
  const onRandomToggle = () => {
    dispatch(videoActions.setIsRandom())
  }
  const formDuration = (value:string) => {
    const minute = value?.slice(2,3)
    const seconds = parseInt(value?.slice(4,6))
    return `0${minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  const formElapsed = (value:number) => {
    const minute = Math.floor(value / 60)
    const seconds = Math.ceil(value - minute * 60)
    return `0${minute}:${seconds < 10 ? `0${seconds}` : seconds}`; 
  }
  useEffect(() => {
    dispatch(videoActions.setDuration(videos[videoIndex]?.contentDetails?.duration))
    dispatch(videoActions.setDuration(formDuration(videos[videoIndex]?.contentDetails?.duration)))
    dispatch(videoActions.setProgressTime((parseInt(elapsedTime)/totalTime) * 100))
  },[duration, elapsedTime, videoIndex, totalTime, videos, dispatch])
  let nowTime = formElapsed(parseInt(elapsedTime))
  return (
    <Detail>
      <Thumbnails src={videos[videoIndex]?.snippet.thumbnails.maxres.url} alt='thumbnails'/>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube-nocookie.com/embed/${videos[videoIndex]?.id}`} 
        width='100%'
        height='500px'
        volume={volume}
        loop={isLoop}
        muted={isMuted}
        playing={isPlaying}
        onProgress = {(progress:any) => dispatch(videoActions.setElapsedTime(progress.playedSeconds))}
        onEnded ={handleNextVideo}
        style={{display : 'none'}}
        />
    <Info>
      <h4>{videos[videoIndex]?.snippet?.title}</h4>
      <h4>{videos[videoIndex]?.snippet?.publishedAt.slice(0,10)}</h4>
      <Progress>
        <input type='range' min={0} max={totalTime ? totalTime : 0} value={elapsedTime} onChange={onSeekChange}/>
        <p>{nowTime} | {duration}</p>
      </Progress>
      <div style={{display:'flex'}}>
        <img src={Prev} alt='prev' onClick={handlePrevVideo} style={{width :'30px', height : '30px'}}></img>
        <button onClick={backwardBtn}>-5</button>
        {isPlaying ? <img src={Pause} alt='pause' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/> : <img src={Play} alt='play' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/>}
        <button onClick={forwardBtn}>+5</button>
        <img src={Next} alt="next" onClick={handleNextVideo} style={{width :'30px', height : '30px'}}></img>
        <VolumeControls volume={volume * 100} isMuted={isMuted}>
          {isMuted || volume * 100 === 0 ? <img src={MuteSpeaker} alt='muted' style={{width :'30px', height : '30px'}} onClick={onMutedToggle}/> : <img src={Speaker} alt='speaker' style={{width :'30px', height : '30px'}} onClick={() => onMutedToggle()}/>}
          <input type='range' value={isMuted ? 0 : volume * 100} min='0' max='100' onChange={onVolumeChange} step='10'/>
        </VolumeControls>
        {isLoop ? <img src={Loop} alt='loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/> : <img src={NotLoop} alt='not loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/>}
        <button onClick={onRandomToggle}>random</button>
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

const VolumeControls = styled.div<{volume : number; isMuted : boolean}>`
  display :flex;

  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;

    &:focus {
      outline: none;
    }

    //WEBKIT
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? "#d9d9d9" : "#E5E7EB")};
      margin-top: -5px;
      cursor: pointer;
    }
    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume && !props.isMuted
          ? `linear-gradient(to right, #D9D9D9 ${props.volume}%, rgba(229, 231, 235, 0.5)
        ${props.volume}% 100%)`
          : "#E5E7EB"};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`
const Progress = styled.div`
  display :flex;
`

export default React.memo(Video)