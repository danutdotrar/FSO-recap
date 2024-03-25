const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

// use stuff
app.use(cors());
app.use(express.json());

logger.info("Connecting to MongoDB...");

// connect to mongoDB
mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => logger.info(error));

module.exports = app;
