// require express
const express = require("express");

// create express application stored in app variable
const app = express();

// use json parser
app.use(express.json());

// define sample API
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

// GET '/'
// request contine toate informatiile despre request-ul HTTP
// response defineste cum raspundem request-ul

// GET '/api/notes"
app.get("/api/notes", (request, response) => {
    response.json(notes);
});

// GET single resource by id '/api/notes/:id'
app.get("/api/notes/:id", (request, response) => {
    // get the id from request params
    const id = Number(request.params.id);

    // find the note with the id equals with the id from params -- in the notes
    const note = notes.find((note) => note.id === id);

    // if the note exists, send note with response.json(note)
    if (note) {
        // send the response.json( finded note )
        response.json(note);
    } else {
        // if not exist, set status 404 not found and end() it (without data)
        response.status(404).end();
    }
});

// DELETE resource based on unique id
// '/api/notes/:id'
app.delete("/api/notes/:id", (request, response) => {
    // take the id from the request.params
    const id = Number(request.params.id);
    // remove with filter the note with id === id from params
    notes = notes.filter((note) => note.id !== id);

    // set status 204 (no content) and return no data with the response
    response.status(204).end();
});

// POST new note
// '/api/notes'
// app.post request at base url '/api/notes'
app.post("/api/notes", (request, response) => {
    // get the body (note data) from the request
    const note = request.body;

    console.log(note);
    response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
