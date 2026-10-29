import axiosClient from '../config/axiosClient';

export const getCategoriaList = () => new Promise((resolve, reject) => {
    axiosClient.get('/categorias').then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const getCategoriaById = (id) => new Promise((resolve, reject) => {
    axiosClient.get(`/categorias/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const insertCategoria = (data) => new Promise((resolve, reject) => {
    axiosClient.post('/categorias', data).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const updateCategoria = (id, data) => new Promise((resolve, reject) => {
    axiosClient.put(`/categorias/${id}`, data).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const deleteCategoria = (id) => new Promise((resolve, reject) => {
    axiosClient.delete(`/categorias/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});
