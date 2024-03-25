const app = require("./app");
const Blog = require("./models/blog");

app.get("/api/blogs", (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

app.post("/api/blogs", (request, response) => {
    const body = request.body;

    const blog = new Blog(body);

    blog.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => console.log(error));
});

const config = require("./utils/config");

// const PORT = process.env.PORT;
app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
