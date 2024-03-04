import axios from "axios";

const baseURL = "http://localhost:3001/notes";

// GET req
const getAll = () => {
    return axios.get(baseURL);
};

// POST req
const create = (obj) => {
    return axios.post(baseURL, obj);
};

// PUT req
const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject);
};

// DELETE req
const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};

// export the services

export default { getAll, create, update, remove };
