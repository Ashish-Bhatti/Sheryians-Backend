import { useDispatch } from 'react-redux';
import { register, login, getMe } from '../services/api.auth';
import { setError, setLoading, setUser } from '../state/auth.slice';

const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({ email, contact, fullname, password, isSeller = false }) {
        try {
            dispatch(setLoading(true));
            const data = await register({ email, contact, fullname, password, isSeller });
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return data.user;
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || 'Registration failed'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return data.user;
        } catch (err) {
            dispatch(setError(err?.response?.data?.message || 'Login failed'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return data.user;
        } catch (err) {
            dispatch(setUser(null));
            dispatch(setError(err?.response?.data?.message || 'Session expired'));
            return null;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleGetMe };
};

export default useAuth;
