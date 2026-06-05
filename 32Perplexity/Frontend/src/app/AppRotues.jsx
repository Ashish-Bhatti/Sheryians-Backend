import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from '../features/auth/components/Protected';

const AppRotues = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <Protected>
                        <Dashboard />
                    </Protected>
                }
            />
        </Routes>
    );
};

export default AppRotues;
