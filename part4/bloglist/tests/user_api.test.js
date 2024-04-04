// import supertest
const supertest = require("supertest");

// import node test
const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");

// import app
const app = require("../app");

// import mongoose for closing connection
const mongoose = require("mongoose");

// import User for accesing mongoDB database
const User = require("../models/user");

// wrap app in supertest function library - supertest the app
const api = supertest(app);

// import helper
const helper = require("./blog_helper");

// initialize the test database before tests
beforeEach(async () => {
    // reset the database
    await User.deleteMany({});

    // create new user and populate the database
    const user = new User({
        username: "root",
        name: "Supertest",
        password: "root",
    });

    // save the user in database
    await user.save();
});

test("check if invalid user (length < 3 for username and password) is not added", async () => {
    // get the users at the start, before HTTP request
    const usersAtStart = await helper.usersInDb();

    // check if invalid users are note added
    // create new invalid user
    const invalidUser = {
        username: "a",
        name: "test",
        password: "a",

        // create POST request
    };
    // expect correct status code
    await api
        .post("/api/users")
        .send(invalidUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

    // check if the length in the database remained the same after the api http request
    // get the users at the end, after the HTTP request
    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
});

test("username must be unique", async () => {
    // get the users at start before HTTP request
    const usersAtStart = await helper.usersInDb();

    // create invalid user with name NOT unique
    const invalidUser = {
        username: "root",
        name: "not valid for sure",
        password: "root",
    };

    // create POST request
    // expect status code and content type
    await api.post("/api/users").send(invalidUser);
    // .expect(400)
    // .expect("Content-Type", /application\/json/);

    // check the length of the users to be the same
    // get the users at the end, after the HTTP request
    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
});

// close connection after tests are executed
after(async () => {
    await mongoose.connection.close();
});
