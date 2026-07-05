import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import  useAuth  from '../features/auth/hook/useAuth';
import { useSelector } from 'react-redux';

const App = () => {
    const { handleGetMe } = useAuth();

    const user = useSelector((state) => state.auth.user);

    console.log(user);

    useEffect(() => {
        handleGetMe();
    }, []);
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
