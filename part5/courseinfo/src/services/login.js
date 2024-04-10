// create HTTP post for login

import axios from "axios";
const baseURL = "http://localhost:3001/api/login";

// make http post request to login
const login = async (credentials) => {
    const response = await axios.post(baseURL, credentials);
    return response.data;
};

export default { login };
