import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router';
import Login from '../pages/Login';

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    const navigate = useNavigate();

    if (loading) {
        return <h1>loading</h1>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Protected;
