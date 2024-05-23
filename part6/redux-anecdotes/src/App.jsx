import { useSelector, useDispatch } from "react-redux";
import { createNew, voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();

    const addNew = (event) => {
        event.preventDefault();

        const inputValue = event.target.anecdote.value;
        dispatch(createNew(inputValue));

        event.target.anecdote.value = "";
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => dispatch(voteAnecdote(anecdote.id))}
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}

            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default App;
