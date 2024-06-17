import { useCounterValue } from "../context/CounterContext";

const Display = () => {
    const counter = useCounterValue();
    return <div>{counter}</div>;
};

export default Display;
