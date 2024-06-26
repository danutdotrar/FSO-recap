import { useState } from "react";

const App = () => {
    // const [counter, setCounter] = useState(0);

    const counter = useCounter();

    return (
        <div>
            <div>{counter.value}</div>
            <button onClick={() => counter.increase()}>plus</button>
            <button onClick={() => counter.decrease()}>minus</button>
            <button onClick={() => counter.zero()}>zero</button>
        </div>
    );
};

// custom hooks
const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = () => {
        setValue(value + 1);
    };

    const decrease = () => {
        setValue(value - 1);
    };

    const zero = () => {
        setValue(0);
    };

    return { value, increase, decrease, zero };
};
