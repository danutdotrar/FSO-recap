import { useContext } from "react";
import CounterContext from "../context/CounterContext";

const Button = ({ type, label }) => {
    const [counter, dispatch] = useContext(CounterContext);

    return <button onClick={() => dispatch({ type })}>{label}</button>;
};

export default Button;
