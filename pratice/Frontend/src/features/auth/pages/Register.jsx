import React from 'react';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();

    const {loading, handleRegister} = useAuth()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const res = await handleRegister(username,email,password)
        console.log(res)
        navigate('/')

    }

    if(loading){
        return <p>Loading...</p>
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
