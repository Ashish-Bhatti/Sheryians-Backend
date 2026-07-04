import axios from 'axios';

const productApi = axios.create({
    baseURL: '/api/product',
    withCredentials: true,
});

export async function createProduct(formData) {
    const response = await productApi.post('/', formData);
    return response.data;
}

export async function getSellerProduct() {
    const resposne = await productApi.get('/seller');

    return resposne.data;
}

export async function getAllProduct() {
    const response = await productApi.get('/');
    return response.data;
}

export async function getProductById(productID) {
    const response = await productApi.get(`/details/${productId}`);
    return response.data;
}
