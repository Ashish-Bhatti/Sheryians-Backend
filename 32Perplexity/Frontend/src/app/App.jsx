import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRotues from './AppRotues';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <AppRotues />
            </BrowserRouter>
        </>
    );
};

export default App;
