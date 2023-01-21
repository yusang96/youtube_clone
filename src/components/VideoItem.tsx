import React, { useCallback } from 'react'
import styled from 'styled-components';

const VideoItem =   ({ video, video: { snippet,statistics }, onVideoClick, display }:any) => {
    const onClick = useCallback(() => {
      onVideoClick(video);
    }, [onVideoClick, video]);
    return (
      <>
        <Container onClick={onClick}>
          <Video >
            <Thumnail
              src={snippet.thumbnails.medium.url}
              alt="video thumbnail"
            />
            <MetaDiv>
              <Title>{snippet.title}</Title>
              <Channel>{snippet.channelTitle}</Channel>
              <h5>{statistics.viewCount}회</h5>
            </MetaDiv>
          </Video>
        </Container>
      </>
    );
  }

  const Container = styled.li`
    width: 100%;
    padding: 0.2em;
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