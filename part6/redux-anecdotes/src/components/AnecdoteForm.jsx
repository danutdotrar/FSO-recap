import React from "react";
import { createNew } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
    removeNotification,
    setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNew = async (event) => {
        event.preventDefault();

        const inputValue = event.target.anecdote.value;
        const newObject = { content: inputValue, important: false, votes: 0 };

        dispatch(createNew(newObject));
        dispatch(setNotification(`"${inputValue}" anecdote has been added`));

        // remove notification
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);

        event.target.anecdote.value = "";
    };

    return (
        <div>
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

export default AnecdoteForm;
