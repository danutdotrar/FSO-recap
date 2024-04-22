import React from "react";
import { useState } from "react";

const Togglable = (props) => {
    const [visibility, setVisibility] = useState(false);

    const showWhenVisible = { display: visibility ? "" : "none" };
    const hideWhenVisible = { display: visibility ? "none" : "" };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    return (
        <div>
            <button style={hideWhenVisible} onClick={toggleVisibility}>
                {props.buttonLabel}
            </button>

            <div style={showWhenVisible}>{props.children}</div>

            <button style={showWhenVisible} onClick={toggleVisibility}>
                cancel
            </button>
        </div>
    );
};

export default Togglable;
