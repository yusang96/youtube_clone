import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriaPlaylistInfo, getFriaPlaylists, getFriaWeeklyInfo, getLiveClip, getLiveClipInfo, playlistActions } from '../store/playlistSlice'
import { AppDispatch } from '../store/store'
import { IVideo } from '../type/videoProps'

const WeeklyCharts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {allData,clipData,allVideos,weeklyData ,coverVideo , liveClips,prevData} = useSelector((state:any) => state.playlist)
  const formatIdString = (list:IVideo[]) => {
    let videoIdList:string[] = []
    list?.map((x) => (
          videoIdList?.push("&id=" + x.snippet.resourceId.videoId)
        ));
    let videoIdString = videoIdList?.join("");
    return videoIdString
  }
  const friaPlaylistId = formatIdString(allData!)
  const liveCliplistId = formatIdString(clipData!)
  useEffect(()=> {
    setTimeout(() => {
      dispatch(getFriaPlaylists())
      dispatch(getFriaPlaylistInfo(friaPlaylistId))
      dispatch(getLiveClip())
      dispatch(getLiveClipInfo(liveCliplistId))
    },43200000)
    //86400
    //43200000
  },[dispatch, friaPlaylistId, liveCliplistId])
  useEffect(() => {
    dispatch(playlistActions.setWeeklyData([...coverVideo,...liveClips]))
  },[coverVideo, dispatch, liveClips])
  let newArray = weeklyData.map((data:any,index:number) => {
    return (
      <h1>{data?.statistics?.viewCount - prevData[index]?.statistics?.viewCount}증가</h1>
    )
  })
  console.log(newArray.sort((a:any,b:any) => b[0]-a[0]))
  return (
    <div>
      WeeklyCharts
      {weeklyData?.map((data:any,index:number) => {
        return (
          <h1>{data?.statistics?.viewCount - prevData[index]?.statistics?.viewCount}증가</h1>
        )
      })}
    </div>
  )
}

export default WeeklyCharts