import axios from 'axios';


// Config API
const api = axios.create({
    baseURL: "http://127.0.0.1:5555/api",
});

export default api;
