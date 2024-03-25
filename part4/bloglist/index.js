const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

console.log("Connecting to MongoDB...");

const mongoUrl =
    "mongodb+srv://morarasudanut:blog-list@cluster0.yspmlao.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(mongoUrl)
    .then((result) => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB ", error);
    });

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
