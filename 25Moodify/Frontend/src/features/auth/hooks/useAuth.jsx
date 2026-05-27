import React, { useContext, useEffect } from 'react';
import { login, register, getMe, logout } from '../services/api.auth';
import { AuthContext } from '../AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    async function handleRegister(username, email, password) {
        setLoading(true);
        const data = await register(username, email, password);
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogin(username, email, password) {
        setLoading(true);
        const data = await login(username, email, password);
        setUser(data.user);
        setLoading(false);
    }

    async function handleGetMe() {
        try {
            setLoading(true);

            const data = await getMe();

            setUser(data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    }

    useEffect(() => {
        handleGetMe();
    }, []);
    return { user, loading, handleLogin, handleRegister, handleGetMe, handleLogout };
};

export default useAuth;
