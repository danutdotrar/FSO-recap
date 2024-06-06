import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

// get the data
export const getNotes = () => axios.get(baseUrl).then((res) => res.data);

// create new note
export const createNote = (newNote) =>
    axios.post(baseUrl, newNote).then((res) => res.data);

// update note
export const updateNote = (updatedNote) =>
    axios
        .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
        .then((res) => res.data);
