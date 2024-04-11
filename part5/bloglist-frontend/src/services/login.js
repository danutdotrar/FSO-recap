// HTTP POST request for login, with axios
import axios from "axios";

const baseURL = "/api/login";

const login = async (credentials) => {
    // make a post request and store the response in a variable
    const response = await axios.post(baseURL, credentials);
    // return the user object containing toke, username and name
    return response.data;
};

export default { login };
