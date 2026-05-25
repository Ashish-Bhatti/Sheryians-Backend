import React, { useContext } from 'react';
import { ProfileContext } from '../ProfileContext';
import {followerList,followingList,getMe,postData} from '../services/profile.api'

const useProfile = () => {
    const context = useContext(ProfileContext);

    const {userProfile, setUserProfile, follower, setFollower, following, setFollowing,posts, setPosts } = context;

    const handleFollowerList = async () => {
        const data = await followerList()
        setFollower(data.followers);
        console.log('Followers:', data.followers);
    };

    const handleFollowingList = async () => {
        const data = await followingList();
        setFollowing(data.following);
        console.log('Following:', data.following);
    };

    const handleUserProfile = async()=>{
        const data = await getMe()
        setUserProfile(data.user);
    }

    const handelPostData = async()=>{
        const data = await postData()
        console.log(data.posts)
        setPosts(data.posts)
    }

    return { userProfile, follower, following, handleFollowerList, handleFollowingList, handleUserProfile ,handelPostData, posts};
};

export default useProfile;
