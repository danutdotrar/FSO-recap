const mongoose = require("mongoose");

// define the new mongoose schema
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
        },
    ],
});

// define the mongoose model
const User = mongoose.model("User", schema);

// export the model
module.exports = User;
