import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '../store/store'
import { IVideo } from '../type/videoProps'
import Play from '../data/play.svg'

const Weekly = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allVideos} = useSelector((state:any) => state.playlist)
  console.log(allVideos)
  return (
    <Grid>
      {allVideos?.map((video:IVideo,index:number) => {
        if (index < 10) {
          return ( 
          <Video key={video.etag} svgurl={Play}>
            <Thumnail src={video?.snippet?.thumbnails?.maxres.url} alt="video thumbnail"/>
            <p>{video.snippet.channelTitle}</p>
            <p>{video.snippet.title}</p>
          </Video>
          )}
      })}
    </Grid>

  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction : column;
`
const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(5 , minmax(20rem,1fr));
    grid-gap : 3rem;
    @media (max-width:768px) {
      grid-template-columns : repeat(2 , minmax(20rem,1fr));
      grid-gap : 30px;
    }
    list-style: none;
    padding : 40px;
`;

const Video = styled.div<{svgurl:string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 250ms ease-in;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.53);
  /* &:hover::after {
    position: absolute;
    top : 50;
    content: url(${({ svgurl }) => svgurl});
  } */
`
const Thumnail = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 5px;
  z-index: 1;
  /* &:hover {
    z-index: -1;
    opacity: 0.5;
  } */
`
export default Weekly