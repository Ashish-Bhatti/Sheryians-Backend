import React, { useEffect, useState } from 'react';
import Follow from '../components/Follow';
import User from '../components/User';
import PostDetails from '../components/PostDetails';
import '../style/user.scss';

const UserProfile = () => {

    return (


            <main className="user-profile">
                <Follow />
                <User  />
                <PostDetails  />
            </main>

    );
};

export default UserProfile;
