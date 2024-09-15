// handlers for routes

// create router for users
// router is useful for reusability, flexibility
const userRouter = require("express").Router();

// import User model
const mongoose = require("mongoose");
const User = require("../models/user");

const bcrypt = require("bcrypt");

// create http requests to get users/post user from/to mongo database
// get req for users from the database
// @@ GET request
// @@ Path '/api/users/'
// @@ Set the response to the users found in database
userRouter.get("/", async (request, response) => {
    // get the users from the database
    const result = await User.find({}).populate("blogs", {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
    });

    // send the users with response.json()
    response.json(result);
});

// @@ GET request
// @@ Path '/api/users/:id'
// @@ Get single user
userRouter.get("/:id", async (request, response) => {
    const id = request.params.id;

    const user = await User.findById(id).populate("blogs", {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
    });

    response.json(user);
});

// post req for creating new user and save it to the database
// create new user
// @@ POST request
// @@ Path '/api/users'
// @@ Set the response the new created object containing data from the request body
userRouter.post("/", async (request, response) => {
    // get the data from the request body
    const { username, name, password } = request.body;

    // verificam username si parola sa fie min 3 length

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: "username and password must be minimum 3 characters",
        });
    }

    // hashuram parola
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // trebuie sa salvam acest user in colectia noastra de useri
    // cream un nou document cu model constructoru-ul User pe care il salvam in baza de data

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,
    });

    // salvam userul in mongoDB cu metoda save()
    const savedUser = await user.save();

    response.json(savedUser);
});

module.exports = userRouter;
