import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import CreateProduct from '../features/products/page/CreateProduct';
import Dashboard from '../features/products/page/Dashboard';
import Home from '../features/products/page/Home';
import ProductDetail from '../features/products/page/ProductDetail';
import Protected from '../features/auth/components/Protected';
import SellerProductDetails from '../features/products/page/SellerProductDetail';
import AppLayout from './AppLayout';
import Cart from '../features/cart/pages/Cart';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route
                    path="/seller/create-product"
                    element={
                        <Protected role="seller">
                            <CreateProduct />
                        </Protected>
                    }
                />
                <Route
                    path="/seller/dashboard"
                    element={
                        <Protected role="seller">
                            <Dashboard />
                        </Protected>
                    }
                />
                <Route
                    path="/seller/product/:productId"
                    element={
                        <Protected role="seller">
                            <SellerProductDetails />
                        </Protected>
                    }
                />
                <Route path='/cart' element={<Protected><Cart/></Protected>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
