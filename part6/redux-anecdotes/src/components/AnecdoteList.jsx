import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
    setNotification,
    removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        return [...state.anecdotes]
            .sort((a, b) => a.votes - b.votes)
            .filter((item) => item.content.includes(state.filter));
    });

    const dispatch = useDispatch();

    const handleClick = (id, content) => {
        dispatch(voteAnecdote(id));

        // show message based on anecdote content
        const notificationMessage = `you voted "${content}"`;
        dispatch(setNotification(notificationMessage));

        // remove notification
        setTimeout(() => {
            dispatch(removeNotification());
        }, 3000);
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() =>
                                handleClick(anecdote.id, anecdote.content)
                            }
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
