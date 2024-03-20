// import mongoose
const mongoose = require("mongoose");

// access password
const password = process.argv[2];

// pass check
if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

// define url
const url = `mongodb+srv://morarasudanut:${password}@cluster0.qh6ymsj.mongodb.net/noteAppRecap?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

// connect to the url
mongoose.connect(url);

// define new mongoose Schema to use as mongoose model
// the schema tells us how the content will be structured
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

// use note schema as model
const Note = mongoose.model("Note", noteSchema);

// define new note based on Note model
const note = new Note({
    content: "First new Schema, then model, then our new obj",
    important: true,
});

// save note on database
note.save().then((result) => {
    console.log("note saved");

    // close the connection
    mongoose.connection.close();
});
