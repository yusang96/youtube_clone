import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import { videoActions } from '../store/videoSlice';
import { IVideo } from '../type/videoProps';

const VideoItem =   ({video , idx} : {video : IVideo,idx:number}) => {
    const dispatch = useDispatch()
    const {wantedVideo } = useSelector((state:any) => state.video)
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
    return (
      <>
        <input type='checkbox' onChange={onCheckBtn} checked={wantedVideo?.map((video:any) => video.id).includes(video?.id) ? true : false}/>
        <Container onClick={onClick}>
          <Video>
            <Thumnail
              src={video?.snippet?.thumbnails?.maxres.url}
              alt="video thumbnail"
            />
            <MetaDiv>
              <Title>{video.snippet.title}</Title>
              <Channel>{video.snippet.channelTitle}</Channel>
              <h5>{video.statistics.viewCount}회</h5>
            </MetaDiv>
          </Video>
        </Container>
      </>
    );
  }

const Container = styled.li`
  width: 100%;
  margin-bottom: 10px;
  list-style: none;
`
const Video = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 250ms ease-in;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
`
const Thumnail = styled.img`
  width: 40%;
  height: 100%;
`
const MetaDiv = styled.div`
    margin-left: 0.2em;

`
const Title = styled.p`
    margin: 0;
  font-size: 0.8rem;
`
const Channel = styled.p`
    margin: 0;
    font-size: 0.6rem;
`
export default VideoItem