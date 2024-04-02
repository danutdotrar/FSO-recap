// import mongoose
const mongoose = require("mongoose");

// define the schema
// user contains an array of the notes (id of notes) that he created
// 'ref' makes the reference to the 'Note' model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        },
    ],
});

// format the schema
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the password should not be revealed
        delete returnedObject.passwordHash;
    },
});

// define a model for that schema
const User = mongoose.model("User", userSchema);

// export model
module.exports = User;
