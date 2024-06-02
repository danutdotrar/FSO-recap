// get the data from the json-server api
const baseUrl = "http://localhost:3001/notes";

import axios from "axios";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNote = async (content) => {
    const object = { content, important: false };
    const response = await axios.post(baseUrl, object);

    return response.data;
};

const updateNote = async (id, updatedObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject);

    return response.data;
};

export default { getAll, createNote, updateNote };
