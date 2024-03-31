const { test, after, beforeEach, describe } = require("node:test");
const Note = require("../models/note");

const assert = require("node:assert");
const mongoose = require("mongoose");
// use supertest package to test the API
const supertest = require("supertest");

const helper = require("./test_helper");

// import express app
const app = require("../app");

// the supertest wraps the app and store it in the 'api' variable
// the api can make HTTP requests to the backend
const api = supertest(app);

// // run these before every test starts
// // initialize database
// // wait for all the async operations to finish execution
// beforeEach(async () => {
//     await Note.deleteMany({});
//     console.log("cleared");

//     // iteram peste initial notes si salvam fiecare nota cu model constructorul Note
//     // noteObjects va contine un array de Mongoose objects create cu model constructor Note
//     // vom avea un array de documente noi pe care trebuie sa-l salvam
//     const noteObjects = helper.initialNotes.map((note) => new Note(note));

//     // iteram noteObjects si salvam fiecare nota cu metoda save(), asta va rezulta un array de Promises
//     // acesta lucru va rezulta intr-un array de promises
//     const promiseArray = noteObjects.map((note) => note.save());

//     // wait for all async operations to finish executing
//     // await for all the Promises in the Promise array
//     // va trebui sa asteptam toate promise-urile din promiseArray sa se execute
//     // folosim Promise.all()
//     // Promise.all poate fi folosit sa transforme un array de Promises intr-un singur Promise, odata ce fiecare promise din array este fullfiled/rezolvat
//     // Promise.all rezolva Promises in paralel
//     await Promise.all(promiseArray);

//     console.log("done");
// });

describe("when there is initially some notes saved", () => {
    // reset db
    beforeEach(async () => {
        await Note.deleteMany({});
        await Note.insertMany(helper.initialNotes);
    });

    test("notes are returned as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("all notes are returned", async () => {
        const response = await api.get("/api/notes");

        assert.strictEqual(response.body.length, helper.initialNotes.length);
    });

    test("a specific note is within the returned notes", async () => {
        const response = await api.get("/api/notes");
        // const notes = await helper.notesInDb();

        const contents = response.body.map((item) => item.content);

        assert(contents.includes("HTML is easy"), true);
    });

    describe("viewing a specific note", () => {
        test("succeeds with a valid id", async () => {
            // get the notes
            const notesAtStart = await helper.notesInDb();

            // get the first note
            const noteToView = notesAtStart[0];

            // make a HTTP request to get a note by its id
            const resultNote = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            // compare two objects
            assert.deepStrictEqual(resultNote.body.content, noteToView.content);
        });

        test("fails with status code 404 if note does not exist", async () => {
            const validNonexistingId = await helper.nonExistingId();

            await api.get(`/api/notes/${validNonexistingId}`).expect(404);
        });

        test("fails with status code 400 if id is invalid", async () => {
            const invalid = "897sadf987dsa789das789ds";

            await api.get(`/api/notes/${invalid}`).expect(400);
        });
    });

    describe("addition of a new note", () => {
        test("succeeds with valid data", async () => {
            const newNote = {
                content: "async/await simplifies making async calls",
                important: true,
            };

            await api
                .post("/api/notes")
                .send(newNote)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            // get the notes from the db
            const notesAtEnd = await helper.notesInDb();

            // get the contents
            const contents = notesAtEnd.map((note) => note.content);

            assert.strictEqual(
                notesAtEnd.length,
                helper.initialNotes.length + 1
            );

            assert(
                contents.includes("async/await simplifies making async calls")
            );
        });

        test("fails with status code 400 if data is invalid", async () => {
            // empty note
            const emptyNote = {
                content: "",
                important: "",
            };

            // make HTTP request with 'api'
            await api.post("/api/notes").send(emptyNote).expect(400);

            // get the notes from the response
            // const response = await api.get("/api/notes");
            const notesAtEnd = await helper.notesInDb();

            // check if the initial notes length stayed the same
            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
        });
    });

    describe("deletion of a note", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            // get the notes
            const notesAtStart = await helper.notesInDb();

            const noteToDelete = notesAtStart[0];

            // check if the HTTP request delete is 204
            // the request will delete the first note
            await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

            // check notes at end
            const notesAtEnd = await helper.notesInDb();

            // check if notes at end doesnt contain the note to delete
            const contents = notesAtEnd.map((note) => note.content);

            assert(!contents.includes(noteToDelete.content));

            // check length, if notes at end strictly equals notes at start - 1
            assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});
