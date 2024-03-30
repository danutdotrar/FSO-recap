const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "test1",
        author: "test1",
        url: "test1",
        likes: 12,
        id: "66018d8a2b3c81aafdcc3a74",
    },
    {
        title: "test2",
        author: "test2",
        url: "test2",
        likes: 123,
        id: "66019801bb32238b612763ad",
    },
];

// find the blogs docs in the database
const blogsInDb = async () => {
    const blogs = await Blog.find({});
    // return an array of notes toJSON
    return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
