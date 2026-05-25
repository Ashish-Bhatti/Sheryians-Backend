import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

import { login, register, getMe } from '../services/auth.api';

const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (username, password) => {
        setLoading(true);

        const res = await login(username, password);

        setUser(res.user);

        setLoading(false);
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        const res = await register(username, email, password);
        setUser(res.user);
        setLoading(false);
    };

    return (
        {user,loading,handleLogin, handleRegister}
    );
};

export default useAuth;
