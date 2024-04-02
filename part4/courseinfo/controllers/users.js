// handle routes for users
const usersRouter = require("express").Router();

const logger = require("../utils/config");

// import User model
const User = require("../models/user");

// import bcrypt to hash the password
const bcrypt = require("bcrypt");

// define routes requests

// get the users from the Mongo database
// @@ GET request
// @@ Path '/api/users'
// @@ Set the response to the users found in MongoDB
usersRouter.get("/", async (request, response) => {
    const result = await User.find({}).populate("notes", {
        content: 1,
        important: 1,
    });

    response.json(result);
});

// @@ POST request
// @@ Path '/api/users'
// @@ Create new user, set the response with the posted user
usersRouter.post("/", async (request, response) => {
    // get the data from the request body
    const { name, username, password } = request.body;

    // hash the password with bcrypt
    // define saltRounds
    const saltRounds = 10;
    // hash the pass
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create new user doc with the model constructor User
    const user = new User({
        username,
        name,
        passwordHash,
    });

    // save the new created doc with save() method
    const result = await user.save();

    // send the result with response.json
    response.status(201).json(result);
});

// delete a user
// @@ DELETE request for unique url of resource
// @@ Path '/api/users/:id'
// Set the response with status 204 no content if id is found
usersRouter.delete("/:id", async (request, response) => {
    // get the id from the url
    // try to delete and set status 204, catch error if not
});

// export user router
module.exports = usersRouter;
