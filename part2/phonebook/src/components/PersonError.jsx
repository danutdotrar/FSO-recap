import React from "react";

const PersonError = ({ errorAdd, errorMessage }) => {
    if (errorAdd === false) {
        return null;
    }

    return <div className="error">{errorMessage}</div>;
};

export default PersonError;
