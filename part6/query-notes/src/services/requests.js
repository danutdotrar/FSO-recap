import axios from "axios";

// get the data
export const getNotes = () =>
    axios.get("http://localhost:3001/notes").then((res) => res.data);
