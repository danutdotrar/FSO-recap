// Handle Routes
// The event handlers of routes are referred as 'controllers'
const blogRoutes = require("express").Router();

// import Blog model
const Blog = require("../models/blog");

// define paths

// @@ GET request
// @@ Path '/api/blogs'
// @@ Set response to the found blogs from Model
blogRoutes.get("/", async (request, response) => {
    const result = await Blog.find({});

    // save the result with the response.json
    response.json(result);
});

// @@ GET request for single resource
// @@ Path '/api/blogs/:id'
// @@ Set the response to the found resource (matching id from URL)
blogRoutes.get("/:id", async (request, response, next) => {
    // get the id from url
    const id = request.params.id;

    // find by id the doc with model method findById(id)
    try {
        const result = await Blog.findById(id);

        if (result) {
            response.json(result);
        } else {
            return response.status(404).send({ error: "malformatted id" });
        }
    } catch (error) {
        next(error);
    }
});

// @@ POST request
// @@ Path '/api/blogs'
// @@ Set the response to the new created document with the help of Blog Model
blogRoutes.post("/", async (request, response, next) => {
    // get the request body
    const body = request.body;

    if (!body.title || !body.url) {
        return response.status(400).json({ error: "title or url missing" });
    }

    // create new document based on Blog model
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    });

    // save the blog
    try {
        const savedBlog = await blog.save();
        response.json(savedBlog);
    } catch (error) {
        next(error);
    }
});

// @@ PUT request for single resource
// @@ Path '/api/blogs/:id'
// @@ Set the response to the newly created obj based on the request body
blogRoutes.put("/:id", async (request, response, next) => {
    // get the id from the url request params
    const id = request.params.id;

    // get the body from request.body
    const body = request.body;

    // define new obj with the data from the body
    const blog = {
        // title: body.title,
        // author: body.author,
        // url: body.url,
        likes: body.likes,
    };

    // use findByIdAndUpdate method from the model Blog
    try {
        const result = await Blog.findByIdAndUpdate(id, blog, {
            new: true,
            runValidators: true,
        });

        response.json(result);
    } catch (error) {
        next(error);
    }
});

// @@ DELETE request for single resource
// @@ Path '/api/blogs/:id'
// @@ Set the response to 204 no content and end() method, which tells that no more data is sent
blogRoutes.delete("/:id", async (request, response, next) => {
    // get the id from the request params id
    const id = request.params.id;

    try {
        // use findByIdAndDelete method from Blog model
        await Blog.findByIdAndDelete(id);

        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = blogRoutes;
