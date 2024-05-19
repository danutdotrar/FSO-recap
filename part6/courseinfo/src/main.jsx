import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";

// un reducer are ca parametrii state-ul curent si o actiune
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "ZERO":
            return 0;
        default:
            return state;
    }
};

// reducer trebuie folosit ca parametru pentru createStore
// store-ul foloseste reducer-ul pentru a gestiona actiunile, care sunt trimise catre store cu metoda dispatch({type: 'nume actiune din reducer'})
const store = createStore(counterReducer);
