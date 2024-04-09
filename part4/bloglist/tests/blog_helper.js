const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
    {
        title: "test1",
        author: "test1",
        url: "test1",
        likes: 12,
        id: "66018d8a2b3c81aafdcc3a74",
        user: "6615353bdc748aef06d0068a",
    },
    {
        title: "test2",
        author: "test2",
        url: "test2",
        likes: 123,
        id: "66019801bb32238b612763ad",
        user: "6615353bdc748aef06d0068a",
    },
];

// find the blogs docs in the database
const blogsInDb = async () => {
    // use find method of the model
    const blogs = await Blog.find({});
    // return an array of notes toJSON
    return blogs.map((blog) => blog.toJSON());
};

// get the users in the user collection and return them as json
const usersInDb = async () => {
    const users = await User.find({});

    return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
