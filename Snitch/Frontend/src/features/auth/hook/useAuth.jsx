import { useDispatch } from 'react-redux';
import { register, login } from '../services/api.auth';
import { setUser } from '../state/auth.slice';

const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({ email, contact, fullname, password, isSeller = false }) {
        const data = await register({ email, contact, fullname, password, isSeller });
        dispatch(setUser(data.user));

        return data.user;
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password });
        dispatch(setUser(data.user));

        return data.user;
    }
    return { handleRegister, handleLogin };
};

export default useAuth;
