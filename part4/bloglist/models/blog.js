// Schema and Model for MongoDB
const mongoose = require("mongoose");

// define the Schema
// the schema will tell MongoDB how the saved objects are structured
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 5 },
    author: String,
    url: String,
    likes: Number,
});

// format the schema
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// define the model
// the model is a constructor for our docs
const Blog = mongoose.model("Blog", blogSchema);

// export the model
module.exports = Blog;
