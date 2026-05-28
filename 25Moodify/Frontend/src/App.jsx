import React from 'react';
// import FaceExpression from './features/Expression/components/FaceExpression';
import AppRoutes from './appRoutes';
import './features/shared/style/global.scss';
import AuthProvider from './features/auth/AuthContext';
import SongProvider from './features/home/SongContext';

const App = () => {
    return (
        <>
            <AuthProvider>
                <SongProvider>
                    <AppRoutes />
                </SongProvider>
            </AuthProvider>
        </>
    );
};

export default App;
