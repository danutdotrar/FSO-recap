import React from "react";

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, val) => acc + val.exercises, 0);

    const sumBasic =
        parts[0].exercises + parts[1].exercises + parts[2].exercises;

    return (
        <div>
            {" "}
            <p>Number of exercises {sum}</p>
        </div>
    );
};

export default Total;
