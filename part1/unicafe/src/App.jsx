import { useState } from "react";

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => {
        const goodCount = good + 1;
        setGood(goodCount);
    };

    const handleNeutral = () => {
        const neutralCount = neutral + 1;
        setNeutral(neutralCount);
    };

    const handleBad = () => {
        const badCount = bad + 1;
        setBad(badCount);
    };

    return (
        <>
            <h1>give feedback pls</h1>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>

            <h1>statistics</h1>
            <div>good: {good}</div>
            <div>neutral:{neutral}</div>
            <div>bad: {bad}</div>
        </>
    );
}

export default App;
