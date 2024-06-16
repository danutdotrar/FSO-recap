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

export { getAll, createNew };
