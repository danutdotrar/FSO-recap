// initialize express server, connect to mongodb and app.use stuff

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

require("express-async-errors");

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

// import Routers
const blogRoutes = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// use token extractor middleware before all routes
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

// use Routers with base url
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// use if app is running in test mode
if (process.env.MONGODB_URI === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
