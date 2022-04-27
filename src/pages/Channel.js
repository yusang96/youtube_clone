import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"

function Channel() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [channel , setChannel] = useState([]);
    let params = useParams();
    const getChannels = async (channelId) => {
      const api = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`)
      const data = await api.json();
      console.log(data.items);
      setChannel(data.items);
    }
    useEffect(()=>{
        getChannels(params.id);
        console.log(params)
      },[params.id])
    return (
        <Chan>
            {channel.map((details)=>{
                return (
                    <div key={details.id}>
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
                                        details.statistics.subscriberCount.length===6 ? details.statistics.subscriberCount.slice(0,2)+"만명" : details.statistics.subscriberCount.length}</h3>
                            </Profile>
                        </ProfileBox>
                        <DescriptionBox>
                            <Descripttion>
                                {details.snippet.description}
                            </Descripttion>
                        </DescriptionBox>
                    </div>
                )
            })}
        </Chan>
    )
}
const Chan = styled.div `
    margin-top : 60px;
`
const BannerBox = styled.div`
    max-width :100%;
    max-height:200px;
    overflow : hidden
`
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
    width:100%;
`
const Descripttion = styled.h2`
    text-align:center;
`
export default Channel