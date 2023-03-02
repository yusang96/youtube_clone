import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from 'react-use'
import { getFriaPlaylistInfo, getFriaPlaylists, getLiveClip, getLiveClipInfo } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { IVideo } from '../type/videoProps'

const WeeklyCharts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,clipData,coverVideo , liveClips,dailyTime,prevData} = useSelector((state:any) => state.playlist)
  const todayLists = JSON.parse(localStorage.getItem('todayData') as string) || [] ;
  const prevLists = JSON.parse(localStorage.getItem('prevData') as string) || [] ;
  // const formatIdString = (list:IVideo[]) => {
  //     let videoIdList:string[] = []
  //     list?.map((x) => (
  //           videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
  //         ));
  //     let videoIdString = videoIdList?.join("");
  //     return videoIdString
  //   }
  //   const friaPlaylistId = formatIdString(allData!)
  //   const liveCliplistId = formatIdString(clipData!)
  //   useEffect(()=> {
  //     if (dailyTime === '17:10:00' )
  //     {
  //       dispatch(getFriaPlaylists())
  //       dispatch(getFriaPlaylistInfo(friaPlaylistId))
  //       dispatch(getLiveClip())
  //       dispatch(getLiveClipInfo(liveCliplistId))
  //     }
  //   },[dailyTime, dispatch, friaPlaylistId, liveCliplistId, prevLists.length])
  // useEffect(() => {
  //   localStorage.setItem('newData' , JSON.stringify(prevData));
  // },[])

  return (
    <div>
      WeeklyCharts
      {todayLists?.map((data:any,index:number) => {
        return (
          <h1 key={data.id}>{data?.statistics?.viewCount - prevLists[index]?.statistics?.viewCount}증가</h1>
        )
      })}
    </div>
  )
}

export default WeeklyCharts