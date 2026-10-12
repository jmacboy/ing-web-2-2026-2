import axios from "axios";
const API_BASE_URL = 'http://localhost:3000/auth';

export const loginUser = (data) => new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/login`, data).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});