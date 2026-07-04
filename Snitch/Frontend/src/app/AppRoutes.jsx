import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import CreateProduct from '../features/products/page/CreateProduct';
import Home from '../features/products/page/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller/create" element={<CreateProduct />} />
        </Routes>
    );
};

export default AppRoutes;
