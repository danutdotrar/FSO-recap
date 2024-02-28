import React from "react";

const StatisticLine = ({ text, value }) => {
    return (
        <tbody>
            <tr>
                <td>{text}:</td>
                <td>{value}</td>
            </tr>
        </tbody>
    );
};

export default StatisticLine;
