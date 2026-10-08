import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/personas';
export const getPersonaList = () =>
    new Promise((resolve, reject) => {
        axios.get(API_BASE_URL).then((response) => {
            console.log(response.data);
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });

export const getPersonById = (id) => new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/${id}`).then((response) => {
        const persona = response.data;
        console.log(persona);
        resolve(persona);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const insertPerson = (data) => new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}`, data).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const updatePerson = (id, data) => new Promise((resolve, reject) => {
    axios.put(`${API_BASE_URL}/${id}`, data).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const deletePerson = (id) => new Promise((resolve, reject) => {
    axios.delete(`${API_BASE_URL}/${id}`).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const searchPerson = (searchText) => new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/search`, {
        search: searchText,
    })
        .then((response) => {
            console.log(response.data);
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
});