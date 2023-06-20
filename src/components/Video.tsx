import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import MuteSpeaker from '../data/Mute_Icon.svg'
import Speaker from '../data/Speaker_Icon.svg'
import Play from '../data/play.svg'
import Pause from '../data/pause.svg'
import Prev from '../data/prev.svg'
import Next from '../data/next.svg'
import Loop from '../data/loop-69.svg'
import NotLoop from '../data/loop-none.svg'
import Random from '../data/random.svg'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux/es/exports'
import { videoActions } from '../store/videoSlice'
import { RootState } from '../store/store'
import dayjs from 'dayjs'

const Video = () => {
  const dispatch = useDispatch()
  const {isPlaying,isMuted,volume,isLoop,isRandom,elapsedTime,duration} = useSelector((state:RootState) => state.video)
  const {allVideos } = useSelector((state:any) => state.playlist)
  const [isHovered, setIsHovered] = useState(false);
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
    if (videoIndex === allVideos.length -1 ) {
      dispatch(videoActions.currentIndex(0))
    } else if (isRandom) {
      let randomIndex = Math.floor(Math.random() * allVideos.length)
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
    dispatch(videoActions.setElapsedTime(parseInt(e.target.value)))
    videoRef.current?.seekTo(elapsedTime)
  }
  const onClickSeek = (e:React.MouseEvent<HTMLInputElement>) => {
    dispatch(videoActions.setElapsedTime(parseInt(e.currentTarget.value)))
    videoRef.current?.seekTo(elapsedTime)
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
    const timeDuration = dayjs.duration(value)
    const minutes = timeDuration.minutes();
    const seconds = timeDuration.seconds();
    return `${minutes > 10 ? minutes : `0${minutes}`}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  const formatElapsed = (value:number) => {
    if (value === 0 ) {
      return '00:00'
    }
    const minute = Math.floor(value / 60)
    const seconds = Math.floor(value - minute * 60)
    return `0${minute}:${seconds < 10 ? `0${seconds}` : seconds}`; 
  }
  useEffect(() => {
    dispatch(videoActions.setDuration(formDuration(allVideos[videoIndex]?.contentDetails?.duration)))
  },[duration, videoIndex, allVideos, dispatch])
  let nowTime = formatElapsed(elapsedTime)
  return (
    <Detail>
      <Thumbnails src={allVideos[videoIndex]?.snippet?.thumbnails?.medium?.url} alt='thumbnails'/>
      <ReactPlayer 
        ref={videoRef}
        url={`https://www.youtube-nocookie.com/embed/${allVideos[videoIndex]?.id}`} 
        volume={volume}
        loop={isLoop}
        muted={isMuted}
        playing={isPlaying}
        onProgress = {(progress) => dispatch(videoActions.setElapsedTime(progress.playedSeconds))}
        onEnded ={handleNextVideo}
        style={{display : 'none'}}
        />
      <Info>
        {/* <Title>{allVideos[videoIndex]?.snippet?.title}</Title> */}
        {/* <h4>{allVideos[videoIndex]?.snippet?.publishedAt.slice(0,10)}</h4> */}
        <span>{nowTime} | {duration}</span>
        <Progress>
          <input type='range' min={0} max={totalTime ? totalTime : 0} value={elapsedTime} onChange={onSeekChange} onClick={onClickSeek}/>
        </Progress>
        <div style={{display:'flex' , justifyContent : 'center' }}>
          <img src={Random} alt='random_btn' onClick={onRandomToggle} style={{width :'30px', height : '30px'}}/>
          <img src={Prev} alt='prev' onClick={handlePrevVideo} style={{width :'30px', height : '30px'}}></img>
          {/* <button onClick={backwardBtn}>-5</button> */}
          {isPlaying ? <img src={Pause} alt='pause' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/> : <img src={Play} alt='play' style={{width :'30px', height : '30px'}} onClick={togglePlaying}/>}
          {/* <button onClick={forwardBtn}>+5</button> */}
          <img src={Next} alt="next" onClick={handleNextVideo} style={{width :'30px', height : '30px'}}></img>
          {isLoop ? <img src={Loop} alt='loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/> : <img src={NotLoop} alt='not loop' onClick={onToggleLoop} style={{width :'30px', height : '30px'}}/>}
          <VolumeControls volume={volume * 100} isMuted={isMuted} isHovered={isHovered} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <input type='range' value={isMuted ? 0 : volume * 100} min='0' max='100' onChange={onVolumeChange} step='10'/>
            {isMuted || volume * 100 === 0 ? <img src={MuteSpeaker} alt='muted' style={{width :'30px', height : '30px'}} onClick={onMutedToggle}/> : <img src={Speaker} alt='speaker' style={{width :'30px', height : '30px'}} onClick={() => onMutedToggle()}/>}
          </VolumeControls>
        </div>
      </Info>
    </Detail>
  )
}
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 400px;
  height: 400px;
  border : 1px solid #fff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  margin-right: 30px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 50%;
    height: 100%;
    margin-bottom: 30px;
  }
`
const Title = styled.p`
  width: 70%;
  margin: auto auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Thumbnails = styled.img`
  width : 40%;
  height: 40%;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const VolumeControls = styled.div<{ volume: number; isMuted: boolean; isHovered: boolean }>`
  display :flex;
  align-items: center;
  height: 100%;
  position: relative;
  flex-direction: ${(props) => (props.isHovered ? 'column' : '')};

  input[type='range'] {
    display: ${(props) => (props.isHovered ? 'block' : 'none')};
    transform: rotate(-90deg);
    position: absolute;
    top:-70px;
    -webkit-appearance: none;
    background: #d9d9d9;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    &::-webkit-slider-thumb:hover {
      background-color: #bfbfbf;
    }

    &::-webkit-slider-thumb:active {
      background-color: #999999;
    }
    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume && !props.isMuted
          ? `linear-gradient(to right, red ${props.volume}%, rgba(229, 231, 235, 0.5)
        ${props.volume}% 100%)`
          : "#E5E7EB"};
      border-radius: 20px;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`
const Progress = styled.div`

`

export default React.memo(Video)