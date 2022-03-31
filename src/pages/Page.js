import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Searched from "./Searched"
import Subscribe from "./Subscribe"

function Page() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/searched/:input" element={<Searched/>}/>
                <Route path="/sub/:id" element={<Subscribe/>}/>
            </Routes>
        </div>
    )
}

export default Page