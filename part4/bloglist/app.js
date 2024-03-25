const express = require("express");
const app = express();
const cors = require("cors");

const config = require("./utils/config");
const logger = require("./utils/logger");

const mongoose = require("mongoose");

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

// use base path with blogRoutes
const blogRoutes = require("./controllers/blogs");
app.use("/api/blogs", blogRoutes);

module.exports = app;
