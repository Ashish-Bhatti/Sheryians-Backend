import React from 'react';
import './style.scss';
import AppRoutes from './AppRoutes';
import AuthProvider from './features/auth/AuthContext';
import PostProvider from './features/post/PostContext';

const App = () => {
    return (
        <>
            <AuthProvider>
                <PostProvider>
                    <AppRoutes />
                </PostProvider>
            </AuthProvider>
        </>
    );
};

export default App;
