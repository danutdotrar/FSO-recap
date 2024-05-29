const initialState = "";

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload;
        default:
            return state;
    }
};

export const filterByInput = (input) => {
    return { type: "SET_FILTER", payload: input };
};

export default filterReducer;
