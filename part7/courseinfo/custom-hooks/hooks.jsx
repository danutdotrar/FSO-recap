import { useState } from "react";

// Mini-Counter App refactor with custom hook
const App = () => {
    // const [counter, setCounter] = useState(0);

    const counter = useCounter();

    return (
        <div>
            <div>{counter.value}</div>
            <button onClick={counter.increase}>plus</button>
            <button onClick={counter.decrease}>minus</button>
            <button onClick={counter.zero}>zero</button>
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

// Mini testing for custom hooks
const AppSecond = () => {
    // each variable will have its own hook
    const left = useCounterClicks();
    const right = useCounterClicks();

    return (
        <div>
            {left.value}
            <button onClick={left.increase}>left</button>
            <button onClick={right.increase}>right</button>
            {right.value}
        </div>
    );
};

const useCounterClicks = () => {
    const [clicks, setClicks] = useState(0);

    const increase = () => {
        setClicks(clicks + 1);
    };

    return { clicks, increase };
};

// Form app
const FormApp = () => {
    // const [name, setName] = useState("");
    // const [born, setBorn] = useState("");
    // const [height, setHeight] = useState("");
    const nameField = useField("text");
    const birthdateField = useField("date");
    const heightField = useField("number");

    // we can spread the attributes
    return (
        <div>
            <form>
                name:
                <input {...nameField} />
                <br />
                birthdate:
                <input {...birthdateField} />
                <br />
                height:
                <input {...heightField} />
            </form>
            <div>
                {nameField.value} {birthdateField.value} {heightField.value}
            </div>
        </div>
    );
};

// Custom hook for form app
const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };

    // return the type from props
    return { type, value, onChange };
};
