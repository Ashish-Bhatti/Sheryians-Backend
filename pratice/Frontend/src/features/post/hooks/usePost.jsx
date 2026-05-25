import { getFeed, createPost, likePost, unLikePost } from '../services/post.api';
import { useContext, useEffect } from 'react';
import { PostContext } from '../PostContext';

const usePost = () => {
    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts.reverse());
        setLoading(false);
    };

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true);
        const data = await createPost(imageFile, caption);
        setFeed([data.post, ...feed]);
        setLoading(false);
    };

    const handleLike = async (postID) => {
        const data = await likePost(postID)
        // await handleGetFeed()
    }

    const handleUnLike = async (postId) => {
        const data = await unLikePost(postId)
        // await handleGetFeed()
    }

    // useEffect(() => {
    //     handleGetFeed();
    // }, []);

    return { loading, post, feed, handleGetFeed, handleCreatePost , handleLike, handleUnLike };
};

export default usePost;
