import { createSlice } from '@reduxjs/toolkit';

import React, { act } from 'react';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        sellerProducts: [],
        product: [],
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const { setSellerProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;
