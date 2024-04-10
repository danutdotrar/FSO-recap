// event handlers of the routes are referred as controllers
// toate rutele relatate cu notes sunt acum in modulul controllers in notes.js

// import express Router
const notesRouter = require("express").Router();

// import jwt
const jwt = require("jsonwebtoken");

// import the Note model
const Note = require("../models/note");
const User = require("../models/user");
const { trusted } = require("mongoose");

// get the token
// keep only the token from the request
// remove 'Bearer' to keep only the token
const getTokenFrom = (request) => {
    // get the authorization header
    const authorization = request.get("authorization");

    // if authorization exists and starts with 'Bearer'
    if (authorization && authorization.startsWith("Bearer")) {
        // replace 'Bearer ' with ''
        return authorization.replace("Bearer ", "");
    }

    return null;
};

// -- create the routes --

// @@ GET request
// @@ Path '/api/notes'
// @@ Set the response to the result from the database
notesRouter.get("/", async (request, response, next) => {
    const notes = await Note.find({}).populate("user", {
        username: 1,
        name: 1,
    });
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

    // verify the jwt token
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    // if decodedToken doesnt exists
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    // get the current user id (user that made the POST request)
    // get the user doc by id of decodedToken
    const user = await User.findById(decodedToken.id);

    // create new document with the model constructor Note to save on the db
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
        user: user._id,
    });

    // save the note to the database
    const savedNote = await note.save();

    // update the users notes array with current note id
    // the user needs to be assigned the id of the saved note
    user.notes = user.notes.concat(savedNote._id);
    // save the user to mongoDB
    await user.save();

    response.json(savedNote);
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
