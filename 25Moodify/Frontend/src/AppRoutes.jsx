import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from './features/auth/components/Protected';
import Home from './features/home/pages/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Protected><Home/></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
