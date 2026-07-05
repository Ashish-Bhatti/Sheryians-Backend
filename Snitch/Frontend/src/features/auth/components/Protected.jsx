import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children, role = 'buyer' }) => {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role;

    if (userRole !== role) {
        return <Navigate to={role === 'seller' ? '/' : '/'} replace />;
    }

    return children;
};

export default Protected;
