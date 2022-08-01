import React, { createRef, useEffect } from "react";
import renderMindMap from "./Components/DrawMap/renderMindMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";

export default function App() {
    const divRef = createRef();
    useEffect(() => {
        renderMindMap(divRef.current);
    }, [divRef]);
    return (
        <>
            {/* <div ref={divRef} /> */}
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
