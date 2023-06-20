import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'
import VideoItem from './VideoItem'
import { AppDispatch } from 'src/store/store'
import { playlistActions } from 'src/store/playlistSlice'

const VideoLists = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [name,setName] = useState('')
  const listsRef = useRef<HTMLUListElement>(null);
  const {allVideos} = useSelector((state:any) => state.playlist)
  const changeName = useCallback((value:string) => {
    setName(value)
    if (listsRef.current) {
      listsRef.current.scrollTo(0, 0);
    }
  },[])
  // const filteredVideo = name ? allVideos?.filter((v: any) => v?.snippet?.title.includes(name)) : allVideos;
  // useEffect(() => {
  //   dispatch(playlistActions.setAllVideos(filteredVideo))
  // },[dispatch, filteredVideo])
  
  return (
    <Wrapper>
      <Title>Playlist</Title>
      <FilterBtn>
        <button onClick={() =>changeName('') }>전체</button>
        <button onClick={() =>changeName('고여름') }>고여름</button>
        <button onClick={() =>changeName('바밍') }>바밍</button>
        <button onClick={() =>changeName('베베리') }>베베리</button>
        <button onClick={() =>changeName('블러비') }>블러비</button>
      </FilterBtn>
      <Lists ref={listsRef}>
        {allVideos?.map((video:IVideo,index:number) => (
          <VideoItem
            video={video}
            idx ={index}
            key={video.id}
          />
      ))}
      </Lists>
    </Wrapper>
  )
}
const Title = styled.h1`
  margin-left:10px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  @media (max-width: 768px) {
    width: 50%;
    height: 70%;
  }
`

const Lists = styled.ul`
  padding : 10px;
  height : 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background-color: rgba(255,255,255,0.4);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.3);
      border-radius:6px;
    }
`
const FilterBtn = styled.div`
  display: flex;
  justify-content: space-around;
  justify-content: center;
`

export default React.memo(VideoLists)