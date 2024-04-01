const logger = require("./logger");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

// express va cauta in mod secvential prin middleware si va apela primul middleware care are 4 parametri (eeror, request, response, next)
const errorHandler = (error, request, response, next) => {
    // log the error message with console.error
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }

    if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
    ) {
        return response
            .status(400)
            .send({ error: "expected `username` to be unique" });
    }

    next(error);
};

// functia unknownEndpoint cand niciunul dintre middleware-uri nu este gasit/executat
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint, requestLogger };
