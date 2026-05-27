import React from 'react';
// import FaceExpression from './features/Expression/components/FaceExpression';
import AppRoutes from './appRoutes';
import './features/shared/style/global.scss';
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
