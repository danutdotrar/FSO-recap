const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

// @@ POST request
// @@ empty test DB
router.post("/reset", async (request, response) => {
    // reset the db
    await User.deleteMany({});
    await Blog.deleteMany({});

    response.status(204).end();
});

module.exports = router;
