import React, { useEffect } from 'react';
import '../style/feed.scss';
import Post from '../components/Post'
import usePost  from '../hooks/usePost'
import { getFeed } from '../services/post.api';
import Nav from '../../shared/components/Nav';

const Feed = () => {

    const {loading, post, feed, handleGetFeed } = usePost();

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading || !feed){
        return <h1>Loading Feed...</h1>
    }

    console.log(feed)

    return (
        <main className="feed-page">
            <Nav/>
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => {
                        return <Post key={post._id} user={post.user} post={post} loading={loading} />;
                    })}
                </div>
            </div>
        </main>
    );
};

export default Feed;
