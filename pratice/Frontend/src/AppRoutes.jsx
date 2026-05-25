import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/post/pages/Feed';
import CreatePost from './features/post/pages/CreatePost';
import UserProfile from './features/profile/pages/UserProfile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path='/user-profile' element={<UserProfile/>}/>
        </Routes>
    );
};

export default AppRoutes;
