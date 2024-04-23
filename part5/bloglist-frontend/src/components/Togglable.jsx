import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(false);

    const showWhenVisible = { display: visibility ? "" : "none" };
    const hideWhenVisible = { display: visibility ? "none" : "" };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    // export toggleVisibility for useRef
    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    return (
        <div>
            <button style={hideWhenVisible} onClick={toggleVisibility}>
                {props.buttonLabel}
            </button>

            <div style={showWhenVisible}>
                {props.children}

                <button style={showWhenVisible} onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
