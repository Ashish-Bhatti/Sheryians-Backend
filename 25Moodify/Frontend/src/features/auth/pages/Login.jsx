import React, { useState } from 'react';
import FromGroup from '../components/FromGroup';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        await handleLogin(username, password);
        navigate('/');
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FromGroup value={username} onChange={(e) => setUsername(e.target.value)} label={'username'} placeholder={'enter  username'} />
                    <FromGroup value={password} onChange={(e) => setPassword(e.target.value)} label={'password'} placeholder={'enter password'} />
                    <button className="button">Log In</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
