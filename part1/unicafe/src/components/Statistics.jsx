import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <div>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={all} />
            <StatisticLine text={"average"} value={average || 0} />
            <StatisticLine text={"positive"} value={positive || 0} />
        </div>
    );
};

export default Statistics;
