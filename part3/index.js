// import the dotenv config
require("dotenv").config();

// import the Note model from the models/note.js
const Note = require("./models/note");

// require express

const express = require("express");
const cors = require("cors");

// create express application stored in app variable
const app = express();

// use json parser
app.use(express.json());
app.use(cors());

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
    // Find all the notes in the mongoose database
    Note.find({}).then((notes) => {
        response.json(notes);
    });
});

// POST new note
// '/api/notes'
// app.post request at base url '/api/notes'
app.post("/api/notes", (request, response) => {
    // get the body (note data) from the request
    const body = request.body;

    // if content doesn't exist
    if (!body.content) {
        // set response status to 400 - bad request
        return response.status(400).json({ error: "content missing" });
    }

    // define new note
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    // add new note to api
    note.save().then((savedNote) => {
        // send the note response
        response.json(savedNote);
    });
});

// GET single resource by id '/api/notes/:id'
app.get("/api/notes/:id", (request, response) => {
    // get the id from request params
    const id = request.params.id;

    Note.findById(id)
        .then((note) => {
            if (note) {
                response.json(note);
            } else {
                return response.status(404).end();
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send({ error: "malformatted id" });
        });
});

// DELETE resource based on unique id
// '/api/notes/:id'
app.delete("/api/notes/:id", (request, response) => {
    // take the id from the request.params
    const id = request.params.id;

    // remove with filter the note with id === id from params
    notes = notes.filter((note) => note.id !== id);

    // set status 204 (no content) and return no data with the response
    response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
