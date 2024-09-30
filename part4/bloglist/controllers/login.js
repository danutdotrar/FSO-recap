// create a login api
// create login router to use it in app.js with a base path
const loginRouter = require("express").Router();

// use jwt for authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

// @@ POST request
// @@ Path '/api/login'
// @@ Send in the response the token
loginRouter.post("/", async (request, response) => {
    // take the data from the body request
    const { username, password } = request.body;

    // use username from body request to find in the User collection mongoDB the document
    const user = await User.findOne({ username });

    // compare passwords from body req and user passwordHash
    // bcrypt.compare returns a Promise and boolean
    const passwordCheck = user
        ? await bcrypt.compare(password, user.passwordHash)
        : false;

    // if user not found and password not ok, return response status 401 bad credentials
    if (!(user && passwordCheck)) {
        return response
            .status(401)
            .send({ error: "username or password not ok" });
    }

    // if ok -> create token, sign in with jwt and attach to token the username and id from the user document

    const userForToken = { username: user.username, id: user.id };

    // the token will have attached the user obj data
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: "1h",
    });

    // send the token with the response
    // trimitem tokenul cu response pentru a putea fi folosit de frontend
    response
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
