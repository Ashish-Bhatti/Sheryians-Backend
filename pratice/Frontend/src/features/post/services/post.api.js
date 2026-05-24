import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export async function getFeed() {
    console.log('start fetching');
    const response = await api.get('/posts/feed');
    console.log('fetching complete', response.data);
    return response.data;
}

export async function createPost(imageFile, caption) {
    const formData = new FormData();
    // we can't send form data directly in axios so we use this method

    formData.append('image', imageFile);
    formData.append('caption', caption);

    const response = await api.post('/posts/create', formData)

    return response.data
}
