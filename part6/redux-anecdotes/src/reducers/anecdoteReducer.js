import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const id = action.payload;

            const foundAnecdote = state.find((item) => item.id === id);

            const changedAnecdote = {
                ...foundAnecdote,
                votes: foundAnecdote.votes + 1,
            };

            return state.map((item) =>
                item.id !== id ? item : changedAnecdote
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

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        // HTTP GET Request
        // dispatch the result from the HTTP GET req to the redux store
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

export default anecdoteSlice.reducer;
