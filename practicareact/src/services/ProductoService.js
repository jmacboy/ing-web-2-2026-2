import axiosClient from '../config/axiosClient';

export const getProductoList = () => new Promise((resolve, reject) => {
    axiosClient.get('/productos').then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const getProductoById = (id) => new Promise((resolve, reject) => {
    axiosClient.get(`/productos/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const insertProducto = (data) => new Promise((resolve, reject) => {
    axiosClient.post('/productos', data).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const updateProducto = (id, data) => new Promise((resolve, reject) => {
    axiosClient.put(`/productos/${id}`, data).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});

export const deleteProducto = (id) => new Promise((resolve, reject) => {
    axiosClient.delete(`/productos/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => {
        reject(error);
    });
});
