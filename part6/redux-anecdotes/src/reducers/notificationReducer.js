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
        setNotificationMessage(state, action) {
            return action.payload;
        },
        removeNotification(state, action) {
            return "";
        },
    },
});

export const { setNotificationMessage, removeNotification } =
    notificationSlice.actions;

// define action creator for the notification
export const setNotification = (message, time) => {
    return async (dispatch) => {
        //
        dispatch(setNotificationMessage(message));

        // remove notification
        setTimeout(() => {
            dispatch(removeNotification());
        }, time * 1000);
    };
};

export default notificationSlice.reducer;
