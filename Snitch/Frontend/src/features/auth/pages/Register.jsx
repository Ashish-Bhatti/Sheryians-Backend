import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const payload = {
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            isSeller: formData.isSeller,
            fullname: formData.fullName,
        };
        await handleRegister(payload);
        navigate('/');
    };

    return (
        <div className="relative min-h-screen bg-zinc-950 text-zinc-200 flex font-sans overflow-hidden">
            {/* Left side: Branding/Image Panel (Hidden on mobile, visible on desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 items-center justify-center">
                {/* Abstract Background / Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
                        alt="Luxury Fashion"
                        className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-zinc-950"></div>
                </div>

                {/* Branding Content */}
                <div className="relative z-10 p-8 lg:p-12 xl:p-16 flex flex-col justify-end h-full w-full">
                    <div className="mb-auto mt-4 xl:mt-8">
                        <h1 className="text-3xl xl:text-4xl font-black text-white tracking-widest uppercase">
                            Snitch<span className="text-yellow-500">.</span>
                        </h1>
                    </div>
                    <div className="max-w-xl">
                        <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4 xl:mb-6">
                            Redefine your <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">style narrative.</span>
                        </h2>
                        <p className="text-zinc-400 text-base xl:text-lg font-medium max-w-md">
                            Join the most exclusive platform for avant-garde fashion. Shop the latest trends, discover unique pieces, and elevate your wardrobe.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side: Form Panel */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Background glow effects for the form area */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none lg:hidden"></div>

                <div className="w-full max-w-md xl:max-w-lg mt-8 mb-8 lg:mt-0 lg:mb-0">
                    <div className="text-center mb-4 xl:mb-6">
                        <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white mb-1.5">Create an account</h2>
                        <p className="text-zinc-400 text-sm xl:text-base font-medium">
                            Join Snitch today. Already a member?{' '}
                            <Link to="/login" className="font-bold text-yellow-500 hover:text-yellow-400 transition-all">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    <div className="bg-zinc-900/60 backdrop-blur-xl py-5 px-6 sm:p-6 xl:p-8 shadow-2xl rounded-3xl border border-white/5 relative overflow-hidden">
                        {/* Subtle top border glow for the card */}
                        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-yellow-500/50 to-transparent"></div>

                        <form className="space-y-3.5" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="relative">
                                <label htmlFor="fullName" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                                    Full Name
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-zinc-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-11 pr-4 py-2.5 text-white placeholder-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Contact Number & Email in a row on larger screens, stacked on small */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Contact Number */}
                                <div className="relative">
                                    <label htmlFor="contactNumber" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                                        Contact Number
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-4 text-zinc-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </span>
                                        <input
                                            id="contactNumber"
                                            name="contactNumber"
                                            type="tel"
                                            required
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-4 text-zinc-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </span>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                                    Password
                                </label>
                                <div className="relative flex items-center group">
                                    <span className="absolute left-4 text-zinc-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-11 pr-12 py-2.5 text-white placeholder-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 text-zinc-500 hover:text-yellow-500 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* isSeller Toggle */}
                            <div className="flex items-center justify-between py-2 px-4 bg-zinc-950/30 rounded-xl border border-white/5 mt-1">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-white">Register as Seller</span>
                                    <span className="text-xs text-zinc-500">Sell your clothes on Snitch</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-10 h-5 bg-zinc-700 rounded-full peer peer-checked:bg-yellow-500 transition-colors shadow-inner"></div>
                                    <div
                                        className={`absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out ${formData.isSeller ? 'translate-x-[20px]' : ''}`}
                                    ></div>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.2)] text-sm font-bold text-zinc-900 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-zinc-900 active:scale-[0.98] transition-all duration-200"
                                >
                                    Create Account
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
