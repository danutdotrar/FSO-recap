const Note = require("../models/note");

const initialNotes = [
    {
        content: "HTML is easy",
        important: false,
    },
    {
        content: "Browser can execute only JavaScript",
        important: true,
    },
];

// return an id that doesnt belong to any obj in the db
const nonExistingId = async () => {
    const note = new Note({ content: "willremovethissoon" });
    await note.save();
    await note.deleteOne();

    return note._id.toString();
};

// check if notes are in DB and return them as toJSON
const notesInDb = async () => {
    const notes = await Note.find({});
    return notes.map((note) => note.toJSON());
};

module.exports = { initialNotes, nonExistingId, notesInDb };
