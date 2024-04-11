// create login router
const loginRouter = require("express").Router();

// import jsonwebtoken
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// import User model
const User = require("../models/user");

// @@ POST request
// @@ Path '/api/login'
// @@
loginRouter.post("/", async (request, response) => {
    // get the data from the body (username, password)
    const { username, password } = request.body;

    // find the user in database with same username
    const user = await User.findOne({ username });

    // check for password compatibility
    // if user is not found return false
    // else, bcrypt compare the password from the request with the passwordHash from the mongoDB
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    // if no user and passwordCorrect
    if (!(user && passwordCorrect)) {
        return response
            .status(401)
            .json({ error: "invalid username or password" });
    }

    // create user obj for jwt token
    // attach username and id in the token
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    // create token with userForToken details
    // limit the validity period of a token
    // set the token to expire in one hour
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    });

    // send the token with response
    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
