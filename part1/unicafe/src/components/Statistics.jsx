import React from "react";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <div>
            <div>good: {good}</div>
            <div>neutral:{neutral}</div>
            <div>bad: {bad}</div>
            <div>all: {all}</div>
            <div>average: {average || 0}</div>
            <div>positive: {positive || 0}</div>
        </div>
    );
};

export default Statistics;
