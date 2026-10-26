import axios from "axios";
import { getToken } from "../services/TokenService";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
});

axiosClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosClient;
