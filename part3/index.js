// import config for env variables and logger for logging clg or cl error
const config = require("./utils/config");
const logger = require("./utils/logger");

// import app - the actual Express application
const app = require("./app");

// import the dotenv config
require("dotenv").config();

// import the Note model from the models/note.js
const Note = require("./models/note");

// require express
// const express = require("express");
// const cors = require("cors");

// create express application stored in app variable
// const app = express();

// use json parser
// app.use(express.json());
// app.use(cors());

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }

    next(error);
};

// GET '/'
// request contine toate informatiile despre request-ul HTTP
// response defineste cum raspundem request-ul

// GET '/api/notes"
// app.get("/api/notes", (request, response) => {
//     // Find all the notes in the mongoose database
//     Note.find({}).then((notes) => {
//         response.json(notes);
//     });
// });

// POST new note
// '/api/notes'
// app.post request at base url '/api/notes'
app.post("/api/notes", (request, response, next) => {
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
    note.save()
        .then((savedNote) => {
            // send the note response
            response.json(savedNote);
        })
        .catch((error) => next(error));
});

// GET single resource by id '/api/notes/:id'
// app.get("/api/notes/:id", (request, response, next) => {
//     // get the id from request params
//     const id = request.params.id;

//     Note.findById(id)
//         .then((note) => {
//             if (note) {
//                 response.json(note);
//             } else {
//                 return response.status(404).end();
//             }
//         })
//         .catch((error) => {
//             next(error);
//         });
// });

// UPDATE resource based on unique id
// @@ route '/api/notes/:id'
app.put("/api/notes/:id", (request, response) => {
    const id = request.params.id;

    // we need the request body
    const { content, important } = request.body;

    // create new obj based on body keys and values
    // const note = {
    //     content: body.content,
    //     important: body.important,
    // };

    // find by id and update the note with data from request body
    // by default, findByIdAndUpdate primeste doc original fara modificari, de aceea adaugam parametrul {new: true}, pentru a folosi doc modificat 'note'
    Note.findByIdAndUpdate(
        id,
        { content, important },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

// DELETE resource based on unique id
// '/api/notes/:id'
app.delete("/api/notes/:id", (request, response) => {
    // take the id from the request.params
    const id = request.params.id;

    // remove with filter the note with id === id from params
    // notes = notes.filter((note) => note.id !== id);
    Note.findByIdAndDelete(id)
        .then((result) => {
            // set status 204 (no content) and return no data with the response
            response.status(204).end();
        })
        .catch((error) => next(error));
});

// all routes should be registered before this
app.use(errorHandler);

app.listen(config.PORT);
// console.log(`Server running on port ${PORT}`);
logger.info(`Server running on port ${config.PORT}`);
