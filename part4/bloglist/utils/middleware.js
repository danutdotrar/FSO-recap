// Middleware for the errors
const logger = require("./logger");

// request logger
const requestLogger = (request, response, next) => {
    logger.info("PATH: ", request.path);
    logger.info("METHOD: ", request.method);
    logger.info("BODY: ", request.body);

    next();
};

// unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// error handle
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id!" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }

    if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
    ) {
        return response.status(400).send({ error: "username must be unique" });
    }

    // move to next error middleware
    next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
