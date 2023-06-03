import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Channel from "./Channel"
import Login from "./Login"
import Profile from "./Profile"
import { IUser } from "../type/userType"
import PlayLists from "../components/PlayLists"
import Charts from "../components/Charts"
import PlayVideo from "../components/PlayVideo"
import Artist from "../artist/Artist"
import Album from "../album/Album"
import LiveClip from "../components/LiveClip"
import Cover from "../components/Cover"
import DailyCharts from "src/components/DailyCharts"


function Page({userObj ,refreshUser}:IUser) {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/channel/:id" element={<Channel/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
            <Route path='/playlist' element={<PlayLists/>}/>
            <Route path='/charts' element={<Charts/>}/>
            <Route path='/cover' element={<Cover/>}/>
            <Route path='/mylist' element={<PlayVideo/>}/>
            <Route path='/liveclip' element={<LiveClip/>}/>
            <Route path='/artist' element={<DailyCharts/>}/>
            <Route path='/album' element={<Album/>}/>
        </Routes>
    )
}

export default Page