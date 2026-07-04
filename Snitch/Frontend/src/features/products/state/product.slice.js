import { createSlice } from '@reduxjs/toolkit';

import React, { act } from 'react';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        sellerProduct: [],
        product: [],
    },
    reducers: {
        setSellerProduct: (state, action) => {
            state.sellerProduct = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const { setSellerProduct, setProduct } = productSlice.actions;

export default productSlice.reducer;
