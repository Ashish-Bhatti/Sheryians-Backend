import { createSlice } from '@reduxjs/toolkit';

const normalizeCartPayload = (payload) => {
    const cartData = payload?.cart ?? payload;

    return {
        items: cartData?.items ?? [],
        totalPrice: cartData?.totalPrice ?? null,
        currency: cartData?.currency ?? null,
    };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: null,
        currency: null,
    },
    reducers: {
        setCart: (state, action) => {
            const normalized = normalizeCartPayload(action.payload);
            state.items = normalized.items;
            state.totalPrice = normalized.totalPrice;
            state.currency = normalized.currency;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find((item) => {
                const itemProductId = item.product?._id?.toString?.() ?? item.product?.toString?.() ?? item.productId;
                const itemVariantId = item.variant?._id?.toString?.() ?? item.variant?.toString?.() ?? item.variantId;
                return itemProductId === productId && itemVariantId === variantId;
            });
            if (item) {
                item.quantity += 1;
            }
        },

        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find((item) => {
                const itemProductId = item.product?._id?.toString?.() ?? item.product?.toString?.() ?? item.productId;
                const itemVariantId = item.variant?._id?.toString?.() ?? item.variant?.toString?.() ?? item.variantId;
                return itemProductId === productId && itemVariantId === variantId;
            });
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // Remove the item from the cart if quantity is 1 and we decrement
                state.items = state.items.filter((i) => i !== item);
            }
        },
    },
});
export const { setCart, addItem, incrementCartItem, decrementCartItem } = cartSlice.actions;
export default cartSlice.reducer;
