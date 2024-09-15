// get all users
// create get request to /api/users
// attach the token to the config obj (headers-authorization)
// return the response data
// export the service

import axios from "axios";

const baseUrl = "/api/users";

let token = "";

const setToken = (token) => {
    console.log(token);
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

export default { setToken, getAllUsers };
