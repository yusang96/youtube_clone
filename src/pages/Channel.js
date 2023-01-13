import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"

function Channel() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [channel , setChannel] = useState([]);
    const [channelVideoLists , setChannelVideoLists] = useState([]);
    const [query , setQuery] = useState('');
    const [nowPage,setNowPage] = useState('');
    const [pages , setPages] = useState([]);
    let params = useParams();
    useEffect(()=>{
        const getChannels = async (channelId) => {
            const api = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`)
            const data = await api.json();
            setChannel(data.items);
          }
        const getVideos = async (channelId) => {
            // q = '커버' or 'shorts' 넣으면 커버 또는 shorts 리스트만 보여줌
            // usestate 로 처음엔 모두 보여주도록 하고 버튼 클릭 시 해당 리스트만 보여주도록 만들기
            const api = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&pageToken=${nowPage}&type=video&maxResults=6&order=date&channelId=${channelId}&key=${API_KEY}`)
            const data = await api.json();
            setPages(data);
            setChannelVideoLists(data.items);
          }
        getChannels(params.id);
        getVideos(params.id);

      },[API_KEY, nowPage, params.id, query])
      const nextBtnClick = () => {
        pages.nextPageToken ? setNowPage(pages.nextPageToken) : setNowPage('')
      }
      const prevBtnClick = () => {
        pages.prevPageToken ? setNowPage(pages.prevPageToken) : setNowPage('');
      }
    return (
        <Chan>
            {channel.map((details)=>{
                return (
                    <React.Fragment key={details.id}>
                        <BannerBox>
                            <Banner src={details.brandingSettings.image.bannerExternalUrl} alt={details.bannerExternalUrl}/>
                        </BannerBox>
                        <ProfileBox>
                            <ImgBox>
                                <Img src={details.snippet.thumbnails.medium.url} alt={details.id}/>
                            </ImgBox>
                            <Profile>
                                <h1>{details.snippet.title}</h1>
                                <h3>구독자:{details.statistics.subscriberCount.length>7 ? details.statistics.subscriberCount.slice(0,4)+"만명" : details.statistics.subscriberCount.length===7 ? details.statistics.subscriberCount.slice(0,3)+"만명" : 
                                        details.statistics.subscriberCount.length===6 ? details.statistics.subscriberCount.slice(0,2)+"만명" : details.statistics.subscriberCount}</h3>
                                <h3>{details.snippet.description}</h3>       
                            </Profile>
                        </ProfileBox>
                    </React.Fragment>
                )
            })}
            <Grid>
                {channelVideoLists.map((item) => {
                    return (
                        <DescriptionBox key={item.etag}>
                            <iframe width='500' height='300' src={`https://www.youtube-nocookie.com/embed/${item.id.videoId}`} allowFullScreen  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="Embedded youtube"></iframe>
                        </DescriptionBox>
                    )
                })}
            </Grid>
            <>
                <button onClick={prevBtnClick}>이전</button>
                <button onClick={nextBtnClick}>다음</button>
            </>
        </Chan>
    )
}
const Chan = styled.div `
    margin-top : 60px;
`
const BannerBox = styled.div`
    max-width :100%;
    max-height:200px;
    overflow : hidden;
`
const Grid = styled.div`
    margin-top : 60px;
    display : grid;
    grid-template-columns : repeat(3 , minmax(20rem,1fr));
    grid-gap : 3rem;
`;

const Banner = styled.img`
    width: 100%;
    height : 720px;
    margin-top:-17%;
`
const ImgBox = styled.div `
    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ProfileBox = styled.div`
    display: flex;
    padding : 20px 50px;
`
const Profile = styled.div`
    margin-top : 10px;
    margin-left : 20px;
`
const DescriptionBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export default Channel