import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";
// const anecdotesAtStart = [
//     "If it hurts, do it more often",
//     "Adding manpower to a late software project makes it later!",
//     "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//     "Premature optimization is the root of all evil.",
//     "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0,
//     };
// };

// const initialState = anecdotesAtStart.map(asObject);

// store the anecdotes from the backend

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

        createNew(state, action) {
            const newAnecdote = action.payload;

            // add the new anecdote to the current state
            return [...state, newAnecdote];
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { voteAnecdote, createNew, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        // HTTP GET Request
        // dispatch the result from the HTTP GET req to the redux store
        const response = await anecdoteService.getAll();
        dispatch(setAnecdotes(response));
    };
};

export default anecdoteSlice.reducer;
