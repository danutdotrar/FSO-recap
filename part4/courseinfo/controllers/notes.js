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
notesRouter.get("/", (request, response, next) => {
    Note.find({}).then((result) => {
        response.json(result);
    });
});

// @@ GET request for single resource
// @@ Path '/api/notes/:id'
// @@ Set the response to the matching resource
notesRouter.get("/:id", (request, response, next) => {
    // get the id from the url
    const id = request.params.id;

    // use findById method from the Note modle
    Note.findById(id)
        .then((result) => {
            if (result) {
                response.json(result);
            } else {
                return response.status(404);
            }
        })
        .catch((error) => next(error));
});

// @@ POST request
// @@ Path '/api/notes'
// @@ Set the response to the result
notesRouter.post("/", (request, response, next) => {
    // get the body request
    const body = request.body;

    // if content doesnt exists
    if (!body.content) {
        return response.status(400).json({ error: "content missing" });
    }

    // create new document with the model constructor Note
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    // save the note to the database
    note.save()
        .then((result) => {
            response.json(result);
        })
        .catch((error) => next(error));
});

// @@ UPDATE request
// @@ Path '/api/notes/:id'
// @@ Set the response to the result from model method
notesRouter.put("/:id", (request, response, next) => {
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
    Note.findByIdAndUpdate(id, note, {
        new: true,
        runValidators: trusted,
        context: "query",
    })
        .then((result) => {
            response.json(result);
        })
        .catch((error) => {
            next(error);
        });
});

// @@ DELETE request
// @@ Path '/api/notes/:id'
// @@ Set the response to 204 no content and use end() method to tell that no more data is sent
notesRouter.delete("/:id", (request, response, next) => {
    // get the id from the url params
    const id = request.params.id;

    // use Note model method for delete
    Note.findByIdAndDelete(id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

module.exports = notesRouter;
