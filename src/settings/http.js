import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": 'x-access-token'
    }
});