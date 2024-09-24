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

    try {
        const response = await axios.get(baseUrl, config);
        return response.data;
    } catch (error) {
        // throw error to useQuery
        throw error;
    }
};

const getSingleBlog = async (blogId) => {
    const config = {
        headers: {
            Authorization: token,
        },
    };

    try {
        const response = await axios.get(`${baseUrl}/${blogId}`, config);

        return response.data;
    } catch (error) {
        throw error;
    }
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

const updateBlog = async (blogId, blogObj) => {
    const response = await axios.put(`${baseUrl}/${blogId}`, blogObj);
    return response.data;
};

const deleteBlog = async (blogId) => {
    // add the Bearer token to the headers Authorization
    const config = { headers: { Authorization: token } };
    const response = await axios.delete(`${baseUrl}/${blogId}`, config);
    return response.data;
};

export default {
    getAll,
    getSingleBlog,
    setToken,
    createBlog,
    updateBlog,
    deleteBlog,
};
