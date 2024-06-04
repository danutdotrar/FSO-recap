import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

// @@ GET Request
// @@ Path - baseUrl
// @@ Get the anecdotes from the backend
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

const updateAnecdote = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
};

export default { getAll, createAnecdote, updateAnecdote };
