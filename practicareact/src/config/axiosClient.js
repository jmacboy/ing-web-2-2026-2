import axios from "axios";
import { getToken, removeToken } from "../services/TokenService";
import { navigateTo } from "./navigationRef";

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

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            removeToken();
            navigateTo("/login");
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
