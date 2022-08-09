import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/signin" element={<Signin />} />
                    {/* <Route path="/mindlist" element={<MindList />} />
                    <Route path="/signup" element={<Signup />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}
