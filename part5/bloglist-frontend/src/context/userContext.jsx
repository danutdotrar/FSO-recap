// define initial state
// create the reducer
// create the context
// create the provider wrapper
// useReducer to provide the value and the dispatch method to the children of wrapper

import { createContext, useReducer } from "react";

const initialState = null;

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...action.payload };

        case "CLEAR_USER": {
            return null;
        }
        default:
            return state;
    }
};

// define provider wrapper
export const UserProviderWrapper = ({ children }) => {
    const [user, dispatchUser] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={[user, dispatchUser]}>
            {children}
        </UserContext.Provider>
    );
};
