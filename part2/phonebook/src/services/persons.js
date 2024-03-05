// Person Service for HTTP Requests
import axios from "axios";

// API URL
const baseURL = "http://localhost:3001/persons";

// GET
const getAll = async () => {
    try {
        const response = await axios.get(baseURL);
        return response;
    } catch (error) {
        console.log("Error axios.get: ", error);
    }
};

// POST
// trebuie sa adaugam numbers in backend
const create = async (newObject) => {
    try {
        const response = await axios.post(baseURL, newObject);
        return response;
    } catch (error) {
        console.log("Error axios.post: ", error);
    }
};

// PUT
// update person info
const update = async (id, newObject) => {
    try {
        const response = axios.put(`${baseURL}/${id}`, newObject);
        return response;
    } catch (error) {
        console.log("Error updating person: ", error);
    }
};

// DELETE
const remove = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response;
    } catch (error) {
        console.log("Error axios.delete: ", error);
    }
};

// Export the module
export default { getAll, create, remove, update };
