import React, { useState } from 'react';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { handleLogin, loading } = useAuth();

    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await handleLogin(username, password);
        console.log(res);
        navigate('/');
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                    />
                    <input
                        onInput={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                    />
                    <button className="button primary-button">Login</button>
                </form>
                <p>
                    Don't have an account ? <Link to={'/register'}>Create One.</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
