import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, getCart, incrementCartItemQuantity, decrementCartItemQuantity, createCartOrder, verifyCartOrder } from '../services/cart.api';
import { setCart, incrementCartItem as incrementCartItemAction, decrementCartItem } from '../state/cart.slice';

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId });

        if (data?.success) {
            const refreshedCart = await handleGetCart();
            return refreshedCart;
        }

        console.log('Item add response:', data);
        return data;
    }

    async function handleGetCart() {
        const data = await getCart();
        const normalizedCart = data?.cart ?? data;
        dispatch(setCart(normalizedCart));
        console.log('Cart retrieved:', normalizedCart);
        return normalizedCart;
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const data = await incrementCartItemQuantity({ productId, variantId });
        dispatch(incrementCartItemAction({ productId, variantId }));
        console.log('Cart item incremented:', data);
        return data;
    }

    async function handleDecrementCartItem({ productId, variantId }) {
        const data = await decrementCartItemQuantity({ productId, variantId });
        // You might want to dispatch a decrement action here if you have one
        dispatch(decrementCartItem({ productId, variantId }));
        console.log('Cart item decremented:', data);
        return data;
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder();
        return data.order;
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
        return data.success;
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleCreateCartOrder, handleVerifyCartOrder };
};
