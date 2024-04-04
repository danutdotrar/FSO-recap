// handlers for routes

// create router for users
// router is useful for reusability, flexibility
const userRouter = require("express").Router();

// import User model
const mongoose = require("mongoose");
const User = require("../models/user");

// create http requests to get users/post user from/to mongo database
// get req for users from the database
// @@ GET request
// @@ Path '/api/users/'
// @@ Set the response to the users found in database
userRouter.get("/", async (request, response) => {
    // get the users from the database
    const result = await User.find({});

    // send the users with response.json()
    response.json(result);
});

// post req for creating new user and save it to the database
// create new user
// @@ POST request
// @@ Path '/api/users'
// @@ Set the response the new created object containing data from the request body

module.exports = userRouter;
