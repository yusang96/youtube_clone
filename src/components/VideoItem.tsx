import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import { videoActions } from '../store/videoSlice';
import { IVideo } from '../type/videoProps';

const VideoItem =   ({video , idx} : {video : IVideo,idx:number}) => {
    const dispatch = useDispatch()
    const {wantedVideo,selectedVideo} = useSelector((state:any) => state.video)
    const {allVideos} = useSelector((state:any) => state.playlist)
    const onClick = useCallback(() => {
      dispatch(videoActions.currentIndex(idx))
    }, [dispatch, idx]);
    const onCheckBtn = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        dispatch(videoActions.setWantedVideo({check : e.target.checked , video}))
      } else {
        dispatch(videoActions.setRemoveVideo({check : e.target.checked , video}))
      }
    }
    const isActive = (idx:number) => {
      return selectedVideo?.id === allVideos[idx]?.id ? 'active' : ''
    };
    return (
      <Container onClick={onClick}>
        <Video className={isActive(idx)}>
          {/* <Thumnail
            src={video?.snippet?.thumbnails?.maxres?.url}
            alt="video thumbnail"
          /> */}
          <MetaDiv>
            <input type='checkbox' onChange={onCheckBtn} checked={wantedVideo?.map((video:any) => video?.id).includes(video?.id) ? true : false}/>
            <Title>{video.snippet.title}</Title>
            {/* <Channel>{video.snippet.channelTitle}</Channel> */}
            <h5>{video.statistics.viewCount}회</h5>
          </MetaDiv>
        </Video>
      </Container>
    );
  }

const Container = styled.li`
  list-style: none;
`
const Video = styled.div`
  cursor: pointer;
  transition: transform 250ms ease-in;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  border-radius: 10px;
  margin-bottom:10px;
  &.active {
    background-color: red;
    color : #fff;
  }
`
const Thumnail = styled.img`
  width: 40%;
  height: 100%;
`
const MetaDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.p`
  width: 50%;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export default VideoItem