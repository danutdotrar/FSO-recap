import React from "react";

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

            <h2>blogs</h2>
            <div>
                <p>
                    {user.name} is Logged In{" "}
                    <button onClick={handleLogOut}>Logout</button>
                </p>
            </div>
        </div>
    );
};

export default Header;
