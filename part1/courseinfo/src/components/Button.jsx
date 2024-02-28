import React from "react";

const Button = (props) => {
    const { onClick, text } = props;
    console.log(props);
    return <button onClick={onClick}>{text}</button>;
};

export default Button;
