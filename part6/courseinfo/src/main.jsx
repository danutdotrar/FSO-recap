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

import { noteReducer } from "./reducers/noteReducer";

const store = createStore(noteReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

// App
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const App = () => {
    const storeData = store.getState();

    const addNote = (event) => {
        event.preventDefault();

        const content = event.target.note.value;
        event.target.note.value = "";
        store.dispatch({
            type: "NEW_NOTE",
            payload: {
                content,
                important: true,
                id: generateId(),
            },
        });
    };

    const toggleImportance = (id) => {
        store.dispatch({
            type: "TOGGLE_IMPORTANCE",
            payload: { id },
        });
    };

    return (
        <>
            <div>
                <form onSubmit={addNote}>
                    <input name="note" />
                    <button type="submit">add</button>
                </form>
                <ul>
                    {storeData.map((note) => (
                        <li
                            key={note.id}
                            onClick={() => toggleImportance(note.id)}
                        >
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
