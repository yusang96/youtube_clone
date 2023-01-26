import React from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'

const Video = ({video}:{video:IVideo}) => {
  console.log(video)
  return (
    <Detail>
      <iframe
        title="youtube video player"
        width="100%"
        height="500px"
        src={`https://www.youtube-nocookie.com/embed/${video?.id}`}
      />
    <Info>
      <h3>{video?.snippet?.title}</h3>
      <h4>{video?.snippet?.channelTitle}</h4>
      <h4>{video?.snippet?.publishedAt.slice(0,10)}</h4>
      <h4>{video?.statistics?.viewCount}회</h4>
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

export default Video