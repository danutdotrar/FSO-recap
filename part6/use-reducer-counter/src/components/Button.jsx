import { useContext } from "react";
import CounterContext from "../context/CounterContext";
import { useCounterDispatch } from "../context/CounterContext";

const Button = ({ type, label }) => {
    const counterDispatch = useCounterDispatch();

    return <button onClick={() => counterDispatch({ type })}>{label}</button>;
};

export default Button;
