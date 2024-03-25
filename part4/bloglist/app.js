const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

// use stuff
app.use(cors());
// use json parser to access data from request.body
app.use(express.json());

logger.info("Connecting to MongoDB...");

// connect to mongoDB
mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => logger.info(error));

// use base path with blogRoutes
const blogRoutes = require("./controllers/blogs");
app.use("/api/blogs", blogRoutes);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
