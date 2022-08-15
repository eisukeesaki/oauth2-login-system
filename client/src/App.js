import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import MapList from "./pages/MapList/MapList";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/maplist" element={<MapList />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}
