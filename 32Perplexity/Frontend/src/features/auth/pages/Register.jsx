import React, { useState } from 'react';
import { Link } from 'react-router';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (event) => {
        event.preventDefault();

        const payload = {
            username,
            email,
            password,
        };

        console.log('Register payload:', payload);
    };

    return (
        <section className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center">
                <div className="w-full max-w-md rounded-3xl border border-indigo-500/30 bg-zinc-900/90 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur">
                    <h1 className="text-3xl font-bold text-indigo-300">Create Account</h1>
                    <p className="mt-2 text-sm text-zinc-300 sm:text-base">Register with your username, email, and password.</p>

                    <form onSubmit={submitForm} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-200">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Choose a username"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-zinc-100 outline-none ring-0 transition duration-200 focus:border-indigo-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-zinc-100 outline-none ring-0 transition duration-200 focus:border-indigo-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Create a password"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-zinc-100 outline-none ring-0 transition duration-200 focus:border-indigo-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-400 px-4 py-3 font-semibold text-zinc-950 transition duration-200 hover:bg-indigo-300 focus:outline-none focus:shadow-[0_0_0_3px_rgba(99,102,241,0.35)]"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-300">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-300 transition duration-200 hover:text-indigo-200">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
