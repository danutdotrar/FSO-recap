import { useState } from "react";

import "./App.css";
import { Authors } from "./components/Authors";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/authors"} element={<Authors />} />
                    <Route path={"/books"} element={<Books />} />
                    <Route path={"/add-book"} element={<AddBook />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
