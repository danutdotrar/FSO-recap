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

export default { setToken, getAllUsers };
