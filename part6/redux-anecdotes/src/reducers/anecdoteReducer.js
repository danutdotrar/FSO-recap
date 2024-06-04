import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        updateVoteAnecdote(state, action) {
            return state.map((item) =>
                item.id !== action.payload.id ? item : action.payload
            );
        },

        appendAnecdote(state, action) {
            const newAnecdote = action.payload;
            // add the new anecdote to the current state
            state.push(newAnecdote);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { appendAnecdote, setAnecdotes, updateVoteAnecdote } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const response = await anecdoteService.getAll();
        dispatch(setAnecdotes(response));
    };
};

export const createNew = (newObject) => {
    return async (dispatch) => {
        const response = await anecdoteService.createAnecdote(newObject);
        dispatch(appendAnecdote(response));
    };
};

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newObject = { ...anecdote, votes: anecdote.votes + 1 };
        const response = await anecdoteService.updateAnecdote(
            anecdote.id,
            newObject
        );

        dispatch(updateVoteAnecdote(response));
    };
};

export default anecdoteSlice.reducer;
