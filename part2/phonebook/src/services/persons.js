// Persons Service
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

// DELETE

// Export the module
export default { getAll, create };
