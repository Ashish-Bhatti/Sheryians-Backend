import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: null,
        currency: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.currency = action.payload.currency;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            const item = state.items.find((item) => item.productId === productId && item.variantId === variantId);
            if (item) {
                item.quantity += 1;
            }
        },
    },
});
export const { setCart, addItem, incrementCartItem } = cartSlice.actions;
export default cartSlice.reducer;
