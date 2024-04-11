// HTTP POST request for login, with axios
import axios from "axios";

const baseURL = "/api/login";

const login = async (credentials) => {
    const response = await axios.post(baseURL, credentials);
    console.log("hello login ", credentials);
};

export default { login };
