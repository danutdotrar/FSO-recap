import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        return [...state.anecdotes]
            .sort((a, b) => a.votes + b.votes)
            .filter((item) => item.content.includes(state.filter));
    });

    const dispatch = useDispatch();

    return (
        <div>
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
        </div>
    );
};

export default AnecdoteList;
