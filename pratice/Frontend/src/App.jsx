import React from 'react';
import './style.scss';
import AppRoutes from './AppRoutes';
import AuthProvider from './features/auth/AuthContext';

const App = () => {
    return (
        <>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </>
    );
};

export default App;
