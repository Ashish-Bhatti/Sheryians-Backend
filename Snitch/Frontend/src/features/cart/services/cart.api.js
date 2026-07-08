import axios from 'axios';

const cartApi = axios.create({
    baseURL: '/api/cart',
    withCredentials: true,
});

export const addItem = async ({ productId, variantId }) => {
    const response = await cartApi.post(`/add/${productId}/${variantId}`, {
        quantity: 1,
    });

    return response.data;
};

export const getCart = async () => {
    const response = await cartApi.get('/');
    return response.data;
};

export const incrementCartItemQuantity = async ({ productId, variantId }) => {
    const response = await cartApi.patch(`/quantity/increment/${productId}/${variantId}`);
    return response.data;
};

export const decrementCartItemQuantity = async ({ productId, variantId }) => {
    const response = await cartApi.patch(`/quantity/decrement/${productId}/${variantId}`);
    return response.data;
};

export const createCartOrder = async () => {
    const response = await cartApi.post('/payment/create/order');
    return response.data;
};

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApi.post('/payment/verify/order', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });

    return response.data;
};
