import axios from "axios";

const baseURL = "http://localhost:3001/notes";

// GET req
const getAll = async () => {
    const request = await axios.get(baseURL);
    return request.data;
};

// POST req
const create = async (obj) => {
    const request = await axios.post(baseURL, obj);
    return request.data;
};

// PUT req
const update = async (id, newObject) => {
    const request = await axios.put(`${baseURL}/${id}`, newObject);
    return request.data;
};

// DELETE req
const remove = async (id) => {
    const request = await axios.delete(`${baseURL}/${id}`);

    return request.data;
};

// export the services
export default { getAll, create, update, remove };
