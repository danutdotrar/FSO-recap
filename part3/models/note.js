// define the mongoose schema and model

// import mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// define the url
// const url = process.env.MONGODB_URI;

// console.log("connecting to ", url);

// connect to the url
// mongoose
//     .connect(url)
//     .then((result) => console.log("connected to the url"))
//     .catch((error) => {
//         console.log("error connecting to MongoDB ", error);
//     });

// define the schema
// the schema will tell the mongo db how the saved objects are structured
const noteSchema = new mongoose.Schema({
    content: { type: String, minLength: 5, required: true },
    important: Boolean,
});

// format the objects returned by the schema
// id = _id
// delete _id and __v
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// // define the model constructor
// const Note = mongoose.model("Note", noteSchema);
const Note = mongoose.model("Note", noteSchema);

// export the model Note wsith the noteSchema refference
module.exports = Note;

// export the model Note
// module.exports = mongoose.model("Note", noteSchema);
