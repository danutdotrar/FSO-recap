// event handlers of the routes are referred as controllers
// toate rutele relatate cu notes sunt acum in modulul controllers in notes.js

// import express Router
const notesRouter = require("express").Router();

const { trusted } = require("mongoose");

// import the Note model
const Note = require("../models/note");

// -- create the routes --

// @@ GET request
// @@ Path '/api/notes'
// @@ Set the response to the result from the database
notesRouter.get("/", async (request, response, next) => {
    const notes = await Note.find({});
    response.json(notes);
});

// @@ GET request for single resource
// @@ Path '/api/notes/:id'
// @@ Set the response to the matching resource
notesRouter.get("/:id", async (request, response, next) => {
    // get the id from the url
    const id = request.params.id;

    const singleNote = await Note.findById(id);

    if (singleNote) {
        response.json(singleNote);
    } else {
        response.status(404).end();
    }
});

// @@ POST request
// @@ Path '/api/notes'
// @@ Set the response to the result
notesRouter.post("/", async (request, response, next) => {
    // get the body request
    const body = request.body;

    // if content doesnt exists
    // if (!body.content) {
    //     return response.status(400).json({ error: "content missing" });
    // }

    // create new document with the model constructor Note to save on the db
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    // save the note to the database
    const savedNote = await note.save();
    response.status(201).json(savedNote);
});

// @@ UPDATE request
// @@ Path '/api/notes/:id'
// @@ Set the response to the result from model method
notesRouter.put("/:id", async (request, response, next) => {
    // get the id of the resource we want to update
    const id = request.params.id;

    // get the body from the request
    const body = request.body;

    // create new object
    const note = {
        content: body.content,
        important: body.important,
    };

    // find and update
    const result = await Note.findByIdAndUpdate(id, note, {
        new: true,
        runValidators: trusted,
        context: "query",
    });

    response.json(result);
});

// @@ DELETE request
// @@ Path '/api/notes/:id'
// @@ Set the response to 204 no content and use end() method to tell that no more data is sent
notesRouter.delete("/:id", async (request, response, next) => {
    // get the id from the url params
    const id = request.params.id;

    // use Note model method for delete
    await Note.findByIdAndDelete(id);

    response.status(204).end();
});

module.exports = notesRouter;
