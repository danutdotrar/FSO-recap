import React from "react";

const Filter = ({ value, handleChange }) => {
    return (
        <div>
            <p>filter shown with:</p>
            <input value={value} onChange={handleChange} />
        </div>
    );
};

export default Filter;
