import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

// get and set the token to use  requests
const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const config = {
        headers: {
            Authorization: token,
        },
    };

    const response = await axios.get(baseUrl, config);
    return response.data;
};

const createBlog = async (newObject) => {
    // add token to Authorization header
    const config = {
        headers: {
            Authorization: token,
        },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

export default { getAll, setToken, createBlog };
