// import createSlice from @reduxjs/toolkit
// define initialState
// new create slice
// define the reducers
// export the slice actions and the reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload;
        },
    },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
