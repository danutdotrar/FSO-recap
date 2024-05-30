import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
    {
        content: "reducer defines how redux store works",
        important: true,
        id: 1,
    },
    {
        content: "state of store can contain any data",
        important: false,
        id: 2,
    },
];

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload;
            state.push({ content, important: false, id: generateId() });
        },

        toggleImportanceOf(state, action) {
            // search in the state the obj with the id equals to payload id
            const noteToChange = state.find(
                (item) => item.id === action.payload
            );

            // create a new object based on previous values but update only the important property
            const changedNote = {
                ...noteToChange,
                important: !noteToChange?.important,
            };

            console.log(current(state));

            // map over the state and if id is different than keep the obj, if id === payload id than keep new obj
            return state.map((item) =>
                item.id !== action.payload ? item : changedNote
            );
        },
    },
});

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const { createNote, toggleImportanceOf } = noteSlice.actions;

export default noteSlice.reducer;
