// import mongoose
const mongoose = require("mongoose");

// define the schema
const userSchema = new mongoose.Schema({
    username: String,
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
        delete _id;
        delete __v;
        // the password should not be revealed
        delete returnedObject.passwordHash;
    },
});

// define a model for that schema
const User = mongoose.model("User", userSchema);

// export model
module.exports = User;
