import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// // un reducer are ca parametrii state-ul curent si o actiune
// // a reducer is a function with a state and a action as parameters, and has defined some actions that returns a new state
// // a reducer need to be used as a parameter to createStore/configureStore to be used

// // reducer trebuie folosit ca parametru pentru createStore
// // store-ul foloseste reducer-ul pentru a gestiona actiunile, care sunt trimise catre store cu metoda dispatch({type: 'nume actiune din reducer'})
// // the store uses the reducer to handle the actions. actions are sent/dispatched to the store with the store.dispatch method
// // const store = createStore(counterReducer);

// // store.subscribe creeaza functii callback, care sunt apelate de catre store de fiecare data cand o actiune este trimisa catre store
// // store.subscribe(() => {
// //     const storeNow = store.getState();
// //     console.log(storeNow);
// // });

import noteService from "./services/notes";
import { configureStore } from "@reduxjs/toolkit";
import noteReducer, {
    createNote,
    toggleImportanceOf,
    appendNote,
    setNotes,
} from "./reducers/noteReducer";
import filterReducer, { filterChange } from "./reducers/filterReducer";

import { Provider } from "react-redux";

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer,
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);

store.subscribe(() => console.log(store.getState()));
