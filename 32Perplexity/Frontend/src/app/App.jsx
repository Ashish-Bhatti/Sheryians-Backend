import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRotues from './AppRotues';
import useAuth from '../features/auth/hook/useAuth';

const App = () => {
    const auth = useAuth()

    useEffect(()=>{
        auth.handleGetMe()
    },[])
    return (
        <main className='bg-black text-white w-screen h-screen'>
            <BrowserRouter>
                <AppRotues />
            </BrowserRouter>
        </main>
    );
};

export default App;
