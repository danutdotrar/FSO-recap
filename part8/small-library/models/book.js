// import mongoose
const mongoose = require("mongoose");

// mongoose has native support for 'unique'
// const uniqueValidator = require("mongoose-unique-validator");

// define the schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
    genres: [{ type: String }],
});

// bookSchema.plugin(uniqueValidator);

// define the model
const Book = mongoose.model("Book", bookSchema);

// export the model
module.exports = Book;
