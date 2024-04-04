// create users collection

// import stuff
const mongoose = require("mongoose");

// create new schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
});

// format schema
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

// define model
const User = new mongoose.model("User", userSchema);

// export User model
module.exports = User;
