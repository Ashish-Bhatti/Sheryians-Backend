import React from 'react';
import '../style/form.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        axios
            .post(
                'http://localhost:3000/api/auth/register',
                {
                    username,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                } // we need to set cookies in the frontend to send them to the backend, and for that we need to set this withCredentials flag to true
            )
            .then((res) => {
                console.log(res.data);
            });
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Enter username" value={username} onInput={(e) => setUsername(e.target.value)} />
                    <input type="email" name="email" placeholder="Enter email" value={email} onInput={(e) => setEmail(e.target.value)} />
                    <input type="text" name="password" placeholder="Enter password" value={password} onInput={(e) => setPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>

                <p>
                    Already have an account?{' '}
                    <Link className="toogleAuthForm" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
