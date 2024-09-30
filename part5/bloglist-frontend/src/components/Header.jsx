import React from "react";
import { Link } from "react-router-dom";

const Header = ({ errorMessage, user, handleLogOut }) => {
    return (
        <div>
            {errorMessage && (
                <>
                    <div
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "lightgreen",
                            padding: "6px",
                        }}
                    >
                        <h2>{errorMessage}</h2>
                    </div>
                </>
            )}

            <div
                className="navbar"
                style={{
                    display: "flex",
                    backgroundColor: "lightgrey",
                    padding: "12px 12px",
                    gap: "32px",
                }}
            >
                <ul
                    style={{
                        display: "flex",
                        listStyleType: "none",
                        gap: "12px",
                        paddingLeft: "0",
                    }}
                >
                    <li>
                        <Link to={"/"}>blogs</Link>
                    </li>
                    <li>
                        <Link to={"users"}>users</Link>
                    </li>
                </ul>
                <div>
                    <p>
                        {user.name} is Logged In{" "}
                        <button onClick={handleLogOut}>Logout</button>
                    </p>
                </div>
            </div>

            <h2>blogs</h2>
        </div>
    );
};

export default Header;
