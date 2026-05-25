import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
});

export async function getMe() {
    const response = await api.get('/auth/get-me');
    return response.data;
}

export async function followerList() {
    const response = await api.get('follow/followerList');
    return response.data;
}

export async function followingList() {
    const response = await api.get('follow/followingList');
    return response.data;
}

export async function postData() {
    const response = await api.get('/posts/getPost');
    return response.data;
}
