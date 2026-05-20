import React, { useState } from 'react';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const { handleLogin,loading } = useAuth();

    const navigate = useNavigate();

    if(loading) return <p>Loading...</p>

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await handleLogin(username, password);
        console.log(res);
        navigate('/')
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Enter username" value={username} onInput={(e) => setusername(e.target.value)} />
                    <input type="text" name="password" placeholder="Enter password" value={password} onInput={(e) => setpassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?{' '}
                    <Link className="toogleAuthForm" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
