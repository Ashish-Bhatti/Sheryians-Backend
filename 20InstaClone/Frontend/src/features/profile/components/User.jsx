import React, { useEffect } from 'react';
import '../style/user.scss';
import useProfile from '../hooks/useProfile';

const User = () => {

    const { userProfile ,follower, following, handleUserProfile } = useProfile()
    useEffect(()=>{
        handleUserProfile()
    },[])


    return (
        <div className="user-card">
            <div className="avatar">
                <img src={userProfile.profileImage || '/default-avatar.png'} alt={`${userProfile.username} avatar`} />
            </div>
            <div className="info">
                <h3 className="name">@{userProfile.username}</h3>
                <div className="stats">
                    <div className="stat">
                        <span className="count">{follower.length}</span>
                        <span className="label">Followers</span>
                    </div>
                    <div className="stat">
                        <span className="count">{following.length}</span>
                        <span className="label">Following</span>
                    </div>
                </div>

                <p className="bio">bio</p>
            </div>
        </div>
    );
};

export default User;
