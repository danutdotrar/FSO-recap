// Handle Routes
const blogRoutes = require("express").Router();

// import Blog model
const Blog = require("../models/blog");

const logger = require("../utils/logger");

// define paths

// @@ GET request
// @@ Path '/api/blogs'
// @@ Set response to the found blogs from Model
blogRoutes.get("/", (request, response) => {
    Blog.find({}).then((result) => {
        response.json(result);
    });
});

// @@ POST request
// @@ Path '/api/blogs'
// @@ Set the response to the new created document with the help of Blog Model
blogRoutes.post("/", (request, response) => {
    // get the request body
    const body = request.body;

    if (!body.title) {
        return response.status(400).json({ error: "title missing" });
    }

    // create new document based on Blog model
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    // save the blog
    blog.save()
        .then((result) => {
            response.json(result);
        })
        .catch((error) => logger.error(error));
});

module.exports = blogRoutes;
