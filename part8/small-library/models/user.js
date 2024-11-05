const mongoose = require("mongoose");

// define mongoose schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
    },
    favoriteGenre: {
        type: String,
        required: true,
        minLength: 3,
    },
});

// create new model based on the schema
const User = mongoose.model("User", userSchema);

// export model
module.exports = User;
