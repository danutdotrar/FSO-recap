import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                <li>
                    <Link to={"/add-book"}>add book</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
