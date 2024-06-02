import { createSlice, current } from "@reduxjs/toolkit";

// const initialState = [
//     {
//         content: "reducer defines how redux store works",
//         important: true,
//         id: 1,
//     },
//     {
//         content: "state of store can contain any data",
//         important: false,
//         id: 2,
//     },
// ];

const noteSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        createNote(state, action) {
            state.push(action.payload);
        },

        toggleImportanceOf(state, action) {
            // map over the state and if id is different than keep the obj, if id === payload id than keep new obj
            return state.map((item) =>
                item.id !== action.payload.id ? item : action.payload
            );
        },
        appendNote(state, action) {
            state.push(action.payload);
        },
        setNotes(state, action) {
            return action.payload;
        },
    },
});

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
    noteSlice.actions;

export default noteSlice.reducer;
