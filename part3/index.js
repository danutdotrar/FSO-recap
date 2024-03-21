// require express
const express = require("express");
const cors = require("cors");
// create express application stored in app variable
const app = express();

// use json parser
app.use(express.json());
app.use(cors());

// MONGO DB
// import mongoose
const mongoose = require("mongoose");

// access password
const password = process.argv[2];

// pass check
if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

// define url
const url = `mongodb+srv://morarasudanut:${password}@cluster0.qh6ymsj.mongodb.net/noteAppRecap?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

// connect to the url
mongoose.connect(url);

// define new mongoose Schema to use as mongoose model
// the schema tells us how the content will be structured
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

// use note schema as model
// models are constructor functions to create new JS object based on the schema
const Note = mongoose.model("Note", noteSchema);

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
    const body = request.body;

    // if content doesn't exist
    if (!body.content) {
        // set response status to 400 - bad request
        return response.status(400).json({ error: "content missing" });
    }

    // define new note
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    };

    // add new note to api
    notes = notes.concat(note);

    // send the note response
    response.json(note);
});

const generateId = () => {
    // add the unique id to the note
    const maxId =
        notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

    // add 1 to the maxId
    return maxId + 1;
};

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
