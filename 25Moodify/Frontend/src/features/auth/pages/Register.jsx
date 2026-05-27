import React, { useState } from 'react';
import FromGroup from '../components/FromGroup';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const { loading, handleRegister } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await handleRegister(username, email, password);
        navigate('/');
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <FromGroup value={username} onChange={(e) => setUsername(e.target.value)} label={'username'} placeholder={'enter  username'} />
                    <FromGroup value={email} onChange={(e) => setEmail(e.target.value)} label={'email'} placeholder={'enter email'} />
                    <FromGroup value={password} onChange={(e) => setPassword(e.target.value)} label={'password'} placeholder={'enter password'} />
                    <button className="button">Register</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
