import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";

// // un reducer are ca parametrii state-ul curent si o actiune
// // a reducer is a function with a state and a action as parameters, and has defined some actions that returns a new state
// // a reducer need to be used as a parameter to createStore/configureStore to be used
// const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//         case "INCREMENT":
//             return state + 1;
//         case "DECREMENT":
//             return state - 1;
//         case "ZERO":
//             return 0;
//         default:
//             return state;
//     }
// };

// // reducer trebuie folosit ca parametru pentru createStore
// // store-ul foloseste reducer-ul pentru a gestiona actiunile, care sunt trimise catre store cu metoda dispatch({type: 'nume actiune din reducer'})
// // the store uses the reducer to handle the actions. actions are sent/dispatched to the store with the store.dispatch method
// // const store = createStore(counterReducer);

// // store.subscribe creeaza functii callback, care sunt apelate de catre store de fiecare data cand o actiune este trimisa catre store
// // store.subscribe(() => {
// //     const storeNow = store.getState();
// //     console.log(storeNow);
// // });

// const App = () => {
//     return (
//         <div>
//             <div>{store.getState()}</div>
//             <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
//                 plus
//             </button>

//             <button onClick={() => store.dispatch({ type: "ZERO" })}>
//                 zero
//             </button>

//             <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
//                 minus
//             </button>
//         </div>
//     );
// };

const noteReducer = (state = [], action) => {
    if (action.type === "NEW_NOTE") {
        return state.concat(action.payload);
    }

    if (action.type === "TOGGLE_IMPORTANCE") {
        //
    }

    return state;
};

const store = createStore(noteReducer);

store.dispatch({
    type: "NEW_NOTE",
    payload: {
        content: "the app state is in redux store",
        important: true,
        id: 1,
    },
});

store.dispatch({
    type: "NEW_NOTE",
    payload: {
        content: "state changes are made with actions",
        important: false,
        id: 2,
    },
});

store.dispatch({ type: "TOGGLE_IMPORTANCE", payload: { id: 2 } });

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
    const storeData = store.getState();

    return (
        <>
            <div>
                <ul>
                    {storeData.map((note) => (
                        <li>
                            {note.content}{" "}
                            {note.important ? " - important" : ""}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

// create a function to render the app and use it in the store.subscribe
const renderApp = () => {
    root.render(<App />);
};

// first render of the app
renderApp();
// re-render the app everytime an action is sent to the store with the method store.dispatch({type: 'action name'})
store.subscribe(renderApp);
