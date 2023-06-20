import React, { useRef } from 'react'
import {useSelector } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'
import { IVideo } from '../type/videoProps'
import dayjs from "dayjs"; 
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const Weekly = () => {
  const {liveClips,coverVideo} = useSelector((state:any) => state.playlist)
  const textRef = useRef<HTMLParagraphElement>(null)
  const isHide = textRef.current?.offsetWidth !== undefined && textRef.current?.offsetWidth < textRef.current?.scrollWidth;
  const formDuration = (value:string) => {
    const timeDuration = dayjs.duration(value)
    const minutes = timeDuration.minutes();
    const seconds = timeDuration.seconds();
    return `${minutes > 10 ? minutes : `0${minutes}`}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  return (
    <Wrapper>
      <List>
        <ListsHeader>
          <h3>#</h3>
          <h3>Track/Artist</h3>
          <h3>Time</h3>
          <h3>Plays</h3>
        </ListsHeader>
        <Lists>
          {coverVideo?.map((video:IVideo,index:number) => {
              return ( 
              <Video key={video.etag}>
                {index+1 < 10 ? `0${index+1}` : `${index+1}`}
                <Thumnail src={video?.snippet?.thumbnails?.medium.url} alt="video thumbnail"/>
                <Title isHide={isHide}>
                  <p ref={textRef}>{video.snippet.title}</p>
                </Title>
                <p>{formDuration(video.contentDetails.duration)}</p>
                <p>{video.statistics.viewCount}</p>
              </Video>
              )
          })}
          </Lists>
        </List>
        <List>
          <ListsHeader>
            <h3>#</h3>
            <h3>Track/Artist</h3>
            <h3>Time</h3>
            <h3>Plays</h3>
          </ListsHeader>
          <Lists>
            {liveClips?.map((video:IVideo,index:number) => {
                return ( 
                <Video key={video.etag}>
                  {index+1 < 10 ? `0${index+1}` : `${index+1}`}
                  <Thumnail src={video?.snippet?.thumbnails?.medium.url} alt="video thumbnail"/>
                  <Title isHide={isHide}>
                    <p>{video.snippet.title}</p>
                  </Title>                  
                  <p>{formDuration(video.contentDetails.duration)}</p>
                  <p>{video.statistics.viewCount}</p>
                </Video>
                )
            })}
          </Lists>
        </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content:center;
  margin: 0 auto;
`
const List = styled.div`
  width: 100%;
  height : 500px;
  margin: 0 10px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`
const Lists = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
`
const ListsHeader = styled.div`
  display: flex;
  justify-content: space-around;
`
const Video = styled.div`
  width : 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
`
const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(-100%);
  }
`

const Title = styled.div<{isHide :boolean}>`
  width: 45%;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    > p {
      animation:  ${scrollText} 7s linear infinite;
    }
  }
`

const Thumnail = styled.img`
  width: 10%;
  height: 50px;
  border-radius: 5px;
  z-index: 0;
`
export default Weekly