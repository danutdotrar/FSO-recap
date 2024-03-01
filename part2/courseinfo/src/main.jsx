import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

// get the notes from the API with axios
// axios.get() returns a promise so we chain .then to it to catch it
axios.get("http://localhost:3001/notes").then((response) => {
    // return data from the response obj
    const notes = response.data;

    ReactDOM.createRoot(document.getElementById("root")).render(
        // pass the notes response from the axios.get method
        <App notes={notes} />
    );
});
