import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

// @@ GET request
// @@ PATH baseURL
// Get the anecdotes
const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

export { getAll };
