import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState([]);
    const [positiveFeedback, setPositiveFeedback] = useState(0);

    const handleGood = () => {
        const goodCount = good + 1;
        setGood(goodCount);

        const totalCounts = goodCount + neutral + bad;
        setTotal(totalCounts);

        setAverage(average.concat(1));

        // set positive feedback
        const goodFeedback = goodCount;
        setPositiveFeedback(goodFeedback);
    };

    const handleNeutral = () => {
        const neutralCount = neutral + 1;
        setNeutral(neutralCount);

        const totalCounts = good + neutralCount + bad;
        setTotal(totalCounts);

        setAverage(average.concat(0));
    };

    const handleBad = () => {
        const badCount = bad + 1;
        setBad(badCount);

        const totalCounts = good + neutral + badCount;
        setTotal(totalCounts);

        setAverage(average.concat(-1));
    };

    const allAverage =
        average.reduce((acc, val) => acc + val, 0) / average.length;

    // find percentage of the positive feedback (cati la % au votat good)
    // aflam cati au votat good
    // impartim nr de votanti good la nr total si inmultim cu 100 pt %
    const goodPercentage = (positiveFeedback / total) * 100;

    return (
        <>
            <h1>give feedback pls</h1>
            <Button handleClick={handleGood} text={"good"} />
            <Button handleClick={handleNeutral} text={"neutral"} />
            <Button handleClick={handleBad} text={"bad"} />
            <Statistics
                good={good}
                neutral={neutral}
                all={total}
                average={allAverage}
                positive={goodPercentage}
            />
        </>
    );
}

export default App;
