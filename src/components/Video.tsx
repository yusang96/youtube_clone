import React from 'react'
import styled from 'styled-components'
import { IPlaylist } from '../type/playlistProps'

const Video = ({video}:any) => {
  console.log(video)
  return (
    <Detail>
      <iframe
        title="youtube video player"
        width="100%"
        height="500px"
        src={`https://www.youtube-nocookie.com/embed/${video?.id}`}
      />
      <h3>{video?.snippet?.title}</h3>
      <h4>{video?.snippet?.channelTitle}</h4>
      <h4>{video?.snippet?.publishedAt.slice(0,10)}</h4>
      <h4>{video?.statistics?.viewCount}회</h4>
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