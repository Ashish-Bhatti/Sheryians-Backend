import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from '../auth.slice';
import { login, register, getMe } from '../services/api.auth';

const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({username, email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await register(username, email, password);
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Registerion failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.message || 'login failed'));
            console.log(error.response?.data);
            console.log(error.response?.status);
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.message || 'user data not found'));
        } finally {
            dispatch(setLoading(false));
        }
    }
    return { handleRegister, handleLogin, handleGetMe };
};

export default useAuth;
