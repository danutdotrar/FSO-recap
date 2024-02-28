import { useState } from "react";

function App() {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    // [0, 0, 0, 0, 0, 0, 0, 0]

    const voteCurrent = () => {
        // create copy from points state
        const pointsCopy = [...points];
        // increment only the point for selected
        pointsCopy[selected]++;

        // set the state to pointsCopy
        setPoints(pointsCopy);
    };

    // select a random note
    const selectRandom = () => {
        const random = Math.floor(Math.random() * anecdotes.length);

        setSelected(random);
    };

    // Display the anecdote with the largest numbers of vote
    const mostVoted = Math.max(...points);
    // aflam maximul array-ului
    console.log("most voted ", mostVoted);

    // aflam indexul celui mai mare nr din array
    const mostVotedIndex = points.indexOf(mostVoted);
    console.log("index ", mostVotedIndex);

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>has {points[selected]}</div>

            <button onClick={voteCurrent}>vote</button>
            <button onClick={selectRandom}>next anecdote</button>

            <div>
                <h1>Anecdote with most votes</h1>
                <div>
                    {anecdotes[mostVotedIndex]}
                    <p>
                        <b>has {mostVoted} points</b>
                    </p>
                </div>
            </div>
        </>
    );
}

export default App;
