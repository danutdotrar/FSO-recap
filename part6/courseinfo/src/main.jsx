import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
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

import noteReducer from "./reducers/noteReducer";
import { Provider } from "react-redux";

const store = createStore(noteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
