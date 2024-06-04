import { createSlice, current } from "@reduxjs/toolkit";
import noteService from "../services/notes";

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

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll();
        dispatch(setNotes(notes));
    };
};

export const createNote = (content) => {
    return async (dispatch) => {
        const newNote = await noteService.createNote(content);
        dispatch(appendNote(newNote));
    };
};

export default noteSlice.reducer;
