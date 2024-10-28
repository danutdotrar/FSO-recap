const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5 },
    phone: {
        type: String,
        minlength: 5,
    },
    street: {
        type: String,
        required: true,
        minlength: 5,
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
    },
});

// Person model will be linked to the plural 'people' in the mongodb - personsData
const Person = mongoose.model("Person", schema);

module.exports = Person;
