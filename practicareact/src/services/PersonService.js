import axiosClient from "../config/axiosClient";

export const getPersonaList = () =>
    new Promise((resolve, reject) => {
        axiosClient.get('/personas').then((response) => {
            console.log(response.data);
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });

export const getPersonById = (id) => new Promise((resolve, reject) => {
    axiosClient.get(`/personas/${id}`).then((response) => {
        const persona = response.data;
        console.log(persona);
        resolve(persona);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const insertPerson = (data) => new Promise((resolve, reject) => {
    axiosClient.post('/personas', data).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const updatePerson = (id, data) => new Promise((resolve, reject) => {
    axiosClient.put(`/personas/${id}`, data).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const deletePerson = (id) => new Promise((resolve, reject) => {
    axiosClient.delete(`/personas/${id}`).then((response) => {
        console.log(response.data);
        resolve(response.data);
    }).catch((error) => {
        console.error(error);
        reject(error);
    });
});
export const searchPerson = (searchText) => new Promise((resolve, reject) => {
    axiosClient.post('/personas/search', {
        search: searchText,
    }).then((response) => {
            console.log(response.data);
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
});
