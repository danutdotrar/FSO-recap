// Middleware for the errors
const logger = require("./logger");

// import User model
const User = require("../models/user");

// import jwt to verify token
const jwt = require("jsonwebtoken");

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

    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" });
    }

    // move to next error middleware
    next(error);
};

const tokenExtractor = (request, response, next) => {
    // get the authorization from request headers
    const authorization = request.headers.authorization;

    // check if authorization exists and 'Bearer' is there
    if (authorization && authorization.startsWith("Bearer ")) {
        // split the authorization into 2, the token will be the second index
        const token = authorization.split(" ")[1];

        request.token = token;
    }

    // call next to move the control to the next middleware
    next();
};

// user extractor middleware
const userExtractor = async (request, response, next) => {
    // get the token
    if (request.token) {
        const token = request.token;

        // decode token, verify with jwt
        const decodedToken = jwt.verify(token, process.env.SECRET);

        // use the data from token to search the user in database
        const user = await User.findById(decodedToken.id);

        // attach the user to the request
        request.user = user;
    }
    // call next to move to the next middleware
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
