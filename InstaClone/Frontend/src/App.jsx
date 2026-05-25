import React from 'react';
import './style.scss';
import AppRoutes from './AppRoutes';
import AuthProvider from './features/auth/AuthContext';
import PostProvider from './features/post/PostContext';
import ProfileProvider from './features/profile/ProfileContext';

const App = () => {
    return (
        <>
            <AuthProvider>
                <PostProvider>
                    <ProfileProvider>
                        <AppRoutes />
                    </ProfileProvider>
                </PostProvider>
            </AuthProvider>
        </>
    );
};

export default App;
