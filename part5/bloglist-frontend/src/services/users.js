import axios from "axios";

const baseUrl = "/api/users";

let token = "";

const setToken = (token) => {
    return `Bearer ${token}`;
};

const getAllUsers = async () => {
    const config = {
        headers: {
            Authorization: token,
        },
    };

    // create the get request
    const response = await axios.get(baseUrl, config);
    return response.data;
};

// get single user
const getSingleUser = async (id) => {
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
};

export default { setToken, getAllUsers, getSingleUser };
