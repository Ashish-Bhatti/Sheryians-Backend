import React, { useEffect } from 'react';
import '../style/postDetails.scss';
import '../style/user.scss';
import useProfile from '../hooks/useProfile';

const PostDetails = () => {

    const {handelPostData, posts} = useProfile()

    useEffect(()=>{
        handelPostData()
    },[])

    return (
        <div className="postDetails">
            <div className="postHeader">
                <h4>Posts</h4>
                <span className="count">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                </span>
            </div>

            <div className="postGrid">
                {posts.length === 0 ? (
                    <p className="empty">No posts yet</p>
                ) : (
                    posts.map((p) => (
                        <div className="postCard" key={p._id}>
                            <div className="postImage">
                                <img src={p.image} alt={p.caption} />
                            </div>
                            <div className="postInfo">
                                <p className="caption">{p.caption}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostDetails;
