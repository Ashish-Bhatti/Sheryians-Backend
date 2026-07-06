import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, getCart, incrementCartItemQuantity } from '../services/cart.api';
import { setCart, incrementCartItem as incrementCartItemAction } from '../state/cart.slice';

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId });
        dispatch(setCart(data));
        console.log('Item added to cart:', data);
        return data;
    }

    async function handleGetCart() {
        const data = await getCart();
        dispatch(setCart(data));
        console.log('Cart retrieved:', data);
        return data;
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const data = await incrementCartItemQuantity({ productId, variantId });
        dispatch(incrementCartItemAction({ productId, variantId }));
        console.log('Cart item incremented:', data);
        return data;
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem };
};
