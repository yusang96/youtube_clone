import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { useInterval } from 'react-use';
import './App.css';
import { authService } from './firebase';
import Page from './pages/Page';
import Header from './shared/Header';
import { getFriaPlaylistInfo, getFriaPlaylists, getLiveClip, getLiveClipInfo, playlistActions } from './store/playlistSlice';
import { AppDispatch } from './store/store';
import { IUser } from './type/userType';
import { IVideo } from './type/videoProps';
function App() {
  useInterval(() => {
    dispatch(playlistActions.setTimes(moment().format('HH:mm:ss')))
  },1000)  
  const dispatch = useDispatch<AppDispatch>()
  const {allData,clipData,coverVideo , liveClips,dailyTime} = useSelector((state:any) => state.playlist)
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
    if (dailyTime === '18:30:00' || dailyTime === '00:00:00')
    {
      dispatch(getFriaPlaylists())
      dispatch(getFriaPlaylistInfo(friaPlaylistId))
      dispatch(getLiveClip())
      dispatch(getLiveClipInfo(liveCliplistId))
    }
  },[dailyTime, dispatch, friaPlaylistId, liveCliplistId])
  useEffect(() => {
    if (dailyTime === '18:30:00' || dailyTime === '00:00:00' ) {
      localStorage.setItem('prevData' , JSON.stringify([...coverVideo , ...liveClips]));
    }
  },[coverVideo, dailyTime, liveClips])
  const [isLogin , setIsLogin] = useState(false);
  const [userObj , setUserObj] = useState<IUser>();
  useEffect(()=> {
    authService.onAuthStateChanged((user)=> {
        if(user) {
            setIsLogin(true);
            setUserObj({
              displayName : user.displayName! ,
              uid:user.uid,
              updateProfile : (args:IUser) => user.updateProfile(args),
            })
        }else{
            setIsLogin(false)
        }
    })
},[])

const refreshUser = () => {
  const user = authService.currentUser;
  if (user) {
    setUserObj({
      displayName : user.displayName!,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    })
  }
}
  return (
      <BrowserRouter>
        <Header isLogin={isLogin} userObj={userObj}/>
        <Page userObj={userObj} refreshUser={refreshUser}/>
      </BrowserRouter>
  );
}

export default App;

