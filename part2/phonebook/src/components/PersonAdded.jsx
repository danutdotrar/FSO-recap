import React from "react";

const PersonAdded = ({ success }) => {
    if (success === false) {
        return null;
    }

    return <div className="success">PersonAdded</div>;
};

export default PersonAdded;
