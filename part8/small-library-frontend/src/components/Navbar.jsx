import { useApolloClient } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
    const client = useApolloClient();

    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.clearStore();
        navigate("/login");
    };

    return (
        <nav>
            <ul
                style={{
                    width: "100%",
                    padding: "unset",
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "start",
                    gap: "32px",
                }}
            >
                <li>
                    <Link to="/authors">authors</Link>
                </li>
                <li>
                    <Link to={"/books"}>books</Link>
                </li>

                {token && (
                    <>
                        <li>
                            <Link to={"/add-book"}>add book</Link>
                        </li>
                        <li>
                            <Link to={"/recommendations"}>recommend</Link>
                        </li>
                        <button onClick={logout}>logout</button>
                    </>
                )}
                {!token && (
                    <li>
                        <Link to={"/login"}>login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
