// test the functionality of users api backend
// use supertest to make http request
// use node test for tests

const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const app = require("../app");

const supertest = require("supertest");
const api = supertest(app);

const helper = require("./test_helper");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("when there is initially one user in db", async () => {
    // before each test save just one user to db
    beforeEach(async () => {
        await User.deleteMany({});

        // populate with one user
        // define password
        const passwordHash = await bcrypt.hash("secret", 10);

        // create new user doc with model constructor User
        const user = new User({
            username: "root",
            name: "Superuser",
            passwordHash,
        });

        // save the user to db
        await user.save();
    });

    test("creation succeeds with fresh username", async () => {
        // trebuie sa verificam daca userul s-a salvat corect in mongodb
        // avem nevoie de userii de la inceput (inainte de request)
        const usersAtStart = await helper.usersInDb();

        // cream user nou
        const newUser = {
            username: "danut",
            name: "danutMorarasu",
            password: "danut",
        };

        // facem un HTTP request POST cu api
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        // verificam daca dimensiunea users din db s-a marit cu +1
        // avem nevoie de users din db (dupa HTTP POST request)
        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        // verificam daca datele s-au salvat corect (username, name)
        const usernames = usersAtEnd.map((user) => user.username);
        assert.strictEqual(usernames.includes("danut"), true);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        // avem nevoie de users din DB la inceput, inainte de HTTP request
        const usersAtStart = await helper.usersInDb();

        // definim un nou obiect cu aceleasi date ca cel din mongoDB
        const newUser = {
            username: "root",
            name: "Superuser",
            password: "danut",
        };

        // facem un HTTP post request
        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        // verificam ca users at start.length === users at end.length
        const usersAtEnd = await helper.usersInDb();

        assert(result.body.error.includes("expected `username` to be unique"));

        assert.strictEqual(usersAtStart.length, usersAtEnd.length);
    });

    test("", () => {});
});

// close mongoDB connection
after(async () => {
    await mongoose.connection.close();
});
