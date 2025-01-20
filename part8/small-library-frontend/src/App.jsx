import { useState } from "react";

import "./App.css";
import { Authors } from "./components/Authors";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

import { useQuery, useMutation, useSubscription } from "@apollo/client";

import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import LoginForm from "./components/LoginForm";

import { useEffect } from "react";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED } from "./queries/queries";

function App() {
    const [token, setToken] = useState("");

    // load token  from localStorage on render
    useEffect(() => {
        const storedToken = localStorage.getItem("library-user-token");

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // TODO next: continue with 8.24
    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded;
            console.log(data);
            window.alert(`${addedBook.title} added`);
        },
    });

    return (
        <>
            <Router>
                <Navbar token={token} setToken={setToken} />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/authors"} element={<Authors />} />
                    <Route path={"/books"} element={<Books />} />
                    <Route path={"/add-book"} element={<AddBook />} />
                    <Route
                        path={"/recommendations"}
                        element={<Recommendations />}
                    />
                    <Route
                        path={"/login"}
                        element={<LoginForm setToken={setToken} />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
