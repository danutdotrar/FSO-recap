import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

// @@ GET request
// @@ Path baseURL
// Get the anecdotes
const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

// @@ POST request
// @@ Path baseURL
// Add the new object
const createNew = async (newObject) => {
    const response = await axios.post(baseURL, newObject);
    return response.data;
};

// @@ PUT request
// @@ Path baseURL/id of the unique resource
// Update the resource with the new data
const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote);
    return response.data;
};

export { getAll, createNew, updateAnecdote };
