import { useState } from "react";

import "./App.css";
import { Authors } from "./components/Authors";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/authors"} element={<Authors />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
