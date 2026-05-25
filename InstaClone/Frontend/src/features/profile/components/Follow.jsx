import useProfile from '../hooks/useProfile';
import { useEffect } from 'react';
import '../style/follow.scss';
import '../style/user.scss';

const Follow = () => {

    const { follower, following, handleFollowerList, handleFollowingList } = useProfile();

    useEffect(()=>{
        handleFollowerList();
        handleFollowingList();
    },[])

    return (
        <div className="follow-data">


            <div className="follower ">
                <p className="title">Followers</p>
                {follower.length === 0 ? (
                    <p className="empty">No followers yet</p>
                ) : (
                    <ul>
                        {follower.map((item) => (
                            <li key={item._id} className="follow-item">
                                <img src={item.profileImage || '/default-avatar.png'} alt={`${item.username} avatar`} />
                                <span>{item.username}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="following">
                <p className="title">Following</p>
                {following.length === 0 ? (
                    <p className="empty">Not following anyone</p>
                ) : (
                    <ul>
                        {following.map((item) => (
                            <li key={item._id} className="follow-item">
                                <img src={item.profileImage || '/default-avatar.png'} alt={`${item.username} avatar`} />
                                <span>{item.username}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Follow;
