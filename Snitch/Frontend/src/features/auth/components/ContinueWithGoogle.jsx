import React from 'react';

const ContinueWithGoogle = () => {
    return (
        <a
            href="/api/auth/google"
            className="group mt-2 flex items-center justify-center w-full rounded-3xl border border-white/10 bg-zinc-950/70 py-2.5 px-4 text-sm font-semibold text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-300/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm transition-colors duration-300 group-hover:bg-yellow-10">
                <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                </svg>
            </span>
            <span className="ml-3 text-sm font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-yellow-10">Continue with Google</span>
        </a>
    );
};

export default ContinueWithGoogle;
