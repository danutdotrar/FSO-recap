import { createStore } from "redux";

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case "NEW_NOTE":
            return [...state, action.payload];

        case "TOGGLE_IMPORTANCE": {
            // search in the state the obj with the id equals to payload id
            const noteToChange = state.find(
                (item) => item.id === action.payload.id
            );

            // create a new object based on previous values but update only the important property
            const changedNote = {
                ...noteToChange,
                important: !noteToChange?.important,
            };

            // map over the state and if id is different than keep the obj, if id === payload id than keep new obj
            return state.map((item) =>
                item.id !== action.payload.id ? item : changedNote
            );
        }

        default:
            return state;
    }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
    return {
        type: "NEW_NOTE",
        payload: {
            content,
            important: false,
            id: generateId(),
        },
    };
};

export const toggleImportanceOf = (id) => {
    return {
        type: "TOGGLE_IMPORTANCE",
        payload: {
            id,
        },
    };
};

export default noteReducer;
