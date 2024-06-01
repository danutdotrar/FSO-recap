// import createSlice
// define initialState
// create notification slice
// define reducers
// export slice's actions and the reducer to use it in the main.js in the store

import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload;
        },
    },
});

export const { setMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
