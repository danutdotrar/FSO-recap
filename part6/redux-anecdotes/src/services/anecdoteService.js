import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

// @@ GET Request
// @@ Path - baseUrl
// @@ Get the anecdotes from the backend
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export default { getAll };
