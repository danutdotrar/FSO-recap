// event handlers of the routes are referred as controllers
// toate rutele relatate cu notes sunt acum in modulul controllers in notes.js

// import express Router
const notesRouter = require("express").Router();

// import the Note model
const Note = require("../models/note");

// create the routes

// @@ GET request
// @@ Path '/api/notes'
// @@ Set the response to the result from the database
notesRouter.get("/", (request, response, next) => {
    Note.find({}).then((result) => {
        response.json(result);
    });
});

// @@ GET single resource
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

module.exports = notesRouter;
