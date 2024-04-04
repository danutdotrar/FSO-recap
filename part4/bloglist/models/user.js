// create database for users collection

// import stuff
const mongoose = require("mongoose");

// create schema
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
});

// format schema

// define model
const User = new mongoose.model("User", userSchema);

// export User model
module.exports = User;
