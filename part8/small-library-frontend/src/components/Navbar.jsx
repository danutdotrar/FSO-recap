import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <ul
            style={{
                padding: "unset",
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-evenly",
            }}
        >
            <li>
                <Link to="/authors">authors</Link>
            </li>
            <li>
                <Link to={"/books"}>books</Link>
            </li>
        </ul>
    );
};

export default Navbar;
