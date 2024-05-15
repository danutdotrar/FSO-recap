// Create express app, connect to mongoDB, app.use router or middlewares
// create Express app in a separate 'app.js' file
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
// import Express
const express = require("express");

// import express async errors, handles the try catch under the hood
require("express-async-errors");

// create Express app and store it in app var
const app = express();

// use cors
const cors = require("cors");
// import notesRouter
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// connect to mongoose
mongoose.set("strictQuery", false);

// log the connection
logger.info(`connecting to ${config.MONGODB_URI}`);

// try the connection
mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
        logger.info(`Connected to MongoDB`);
    })
    .catch((error) => {
        logger.error("Error connecting to the MongoDB: ", error.message);
    });

// use json parser
app.use(express.json());
app.use(cors());

// use the notesRouter with the path defined
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("../courseinfo/controllers/testing");
    app.use("/api/testing", testingRouter);
}

// middlewares
app.use(middleware.requestLogger);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
