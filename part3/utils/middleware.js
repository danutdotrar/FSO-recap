const logger = require("./logger");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (error, request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    // log the error message with console.error
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }

    next(error);
};

module.exports = { errorHandler, unknownEndpoint, requestLogger };
