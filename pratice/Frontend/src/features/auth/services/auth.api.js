import axios from 'axios';

// we use this instance to make our code less repeatitive
const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
});

export async function register(username, email, password) {
    try {
        const response = await api.post('/register', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function login(username, password) {
    try {
        const response = await api.post('/login', {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// it get the current logged in user
export async function getMe() {
    try {
        const response = await api.get('get-me');
        return response.data;
    } catch (error) {
        throw error;
    }
}

// basis way use axios - in this method we have code repeation and solve that we use above method
/* export async function register(username, email, password) {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/auth/register',
            {
                username,
                email,
                password,
            },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function login(username, password) {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/auth/login',
            {
                username,
                password,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
 */
