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
    const response = await productApi.get('/seller');

    return response.data;
}

export async function getAllProduct() {
    const response = await productApi.get('/');
    return response.data;
}

export async function getProductById(productId) {
    const response = await productApi.get(`/detail/${productId}`);
    return response.data;
}

export async function addProductVariant(productId, newProductVariant) {

    console.log(newProductVariant)

    const formData = new FormData()

    newProductVariant.images.forEach((image) => {
        formData.append(`images`, image.file)
    })

    formData.append("stock", newProductVariant.stock)
    formData.append("priceAmount", newProductVariant.price)
    formData.append("attributes", JSON.stringify(newProductVariant.attributes))

    const response = await productApi.post(`/${productId}/variants`, formData)

    return response.data

}