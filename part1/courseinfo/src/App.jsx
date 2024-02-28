import { useState } from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import History from "./components/History";

function App() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [allClicks, setAllClicks] = useState([]);

    const [total, setTotal] = useState(0);

    const handleLeftClick = () => {
        setAllClicks(allClicks.concat("L"));

        const updatedLeft = left + 1;

        setLeft(updatedLeft);
        setTotal(updatedLeft + right);
    };

    const handleRightClick = () => {
        setAllClicks(allClicks.concat("R"));

        const updatedRight = right + 1;

        setRight(updatedRight);
        setTotal(updatedRight + left);
    };

    return (
        <>
            {left}
            <Button onClick={handleLeftClick} text={"left"} />
            <Button onClick={handleRightClick} text={"right"} />
            {right}
            <History allClicks={allClicks} />
            <p>total: {total}</p>
        </>
    );
}

export default App;
