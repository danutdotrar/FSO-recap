// import stuff
import { useReducer, createContext } from "react";

// define initial state
const initialState = {
    title: "",
    author: "",
};

// create the context
export const NotificationContext = createContext();

// define the reducer
const notificationReducer = (state, action) => {
    // define the reducer actions
    switch (action.type) {
        case "SET_TITLE": {
            const newState = { ...state, title: action.payload };

            return newState;
        }

        case "SET_AUTHOR": {
            const newState = { ...state, author: action.payload };

            return newState;
        }

        case "CLEAR_FIELDS": {
            return { title: "", author: "" };
        }

        default:
            return state;
    }
};

// create the wrapper provider that wraps the children and pass the value to them
export const NotificationWrapper = ({ children }) => {
    // use the useReducer with the reducer and the initialState
    const [state, dispatchState] = useReducer(
        notificationReducer,
        initialState
    );

    return (
        <NotificationContext.Provider value={[state, dispatchState]}>
            {children}
        </NotificationContext.Provider>
    );
};
