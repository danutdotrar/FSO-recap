import { useReducer, useContext, createContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return action.payload;
        default:
            return state;
    }
};

// create the context
export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    // use the reducer with the notificationReducer
    const [message, dispatchMessage] = useReducer(notificationReducer, "");

    return (
        <NotificationContext.Provider value={[message, dispatchMessage]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

// custom hook to export the value
export const useNotificationValue = () => {
    const context = useContext(NotificationContext);
    const value = context[0];

    return value;
};

// custom hook to export the function
export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotificationDispatch must be used within a NotificationProvider"
        );
    }

    const dispatchFunction = context[1];

    const setMessage = (payload) => {
        return dispatchFunction({ type: "SET_MESSAGE", payload });
    };

    const clearMessage = () => {
        return dispatchFunction({ type: "SET_MESSAGE", payload: "" });
    };

    return { setMessage, clearMessage };
};
