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
        console.log(params.id)
      },[params.id])
    return (
        <Chan>
            {channel.map((details)=>{
                return (
                    <div key={details.id}>
                        <img src={details.brandingSettings.image.bannerExternalUrl} alt={details.bannerExternalUrl}/>
                        <img src={details.snippet.thumbnails.medium.url} alt={details.id}/>
                        <h3>{details.snippet.title}</h3>
                        <p>구독자:{details.statistics.subscriberCount}</p>
                    </div>
                )
            })}
        </Chan>
    )
}
const Chan = styled.div `
    margin-top : 60px;
`
export default Channel