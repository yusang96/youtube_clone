import React from 'react'
import styled from 'styled-components'
import { IVideo } from '../type/videoProps'

const Video = (video:any) => {
  return (
    <Detail>
        <iframe
        title="youtube video player"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      />
      <h2>{video.snippet.title}</h2>
      <h3>{video.snippet.channelTitle}</h3>
    </Detail>
  )
}

const Detail = styled.div`
    padding: 0.2em;
`

const Description = styled.div`
    white-space: pre-wrap;
`

export default Video