import React from "react";
import { createNew } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNew = (event) => {
        event.preventDefault();

        const inputValue = event.target.anecdote.value;
        dispatch(createNew(inputValue));

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
