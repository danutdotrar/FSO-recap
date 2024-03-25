// create Express app in a separate 'app.js' file

// import Express
const express = require("express");

// create Express app and store it in app var
const app = express();

// use json parser
app.use(express.json());

// use cors
const cors = require("cors");
app.use(cors());

//
const notesRouter = require("./controllers/notes");
app.use("/api/notes", notesRouter);

module.exports = app;
