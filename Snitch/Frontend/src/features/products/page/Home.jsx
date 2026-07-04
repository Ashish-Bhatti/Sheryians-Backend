import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const Home = () => {
    const products = useSelector((state) => state.product?.product ?? []);
    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            try {
                await handleGetAllProducts();
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        if (isMounted) {
            loadProducts();
        }

        return () => {
            isMounted = false;
        };
    }, [handleGetAllProducts]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
                <header className="mb-6 flex items-center justify-between rounded-full border border-white/10 bg-zinc-900/70 px-4 py-3 shadow-lg backdrop-blur-xl sm:px-5">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-yellow-500">Snitch</p>
                        <p className="text-sm text-zinc-400">Curated fashion drops</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:border-yellow-500 hover:text-yellow-400">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:from-yellow-300 hover:to-yellow-400"
                        >
                            Register
                        </Link>
                    </div>
                </header>

                <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-500">The Collection</p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Discover pieces that feel timeless.</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                                Browse a polished storefront of statement fashion, thoughtful details, and elevated essentials.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 lg:justify-end">
                            <Link
                                to="/seller/create"
                                className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-yellow-500 hover:text-yellow-400"
                            >
                                Create Listing
                            </Link>
                            <button
                                onClick={() => navigate('/register')}
                                className="rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:from-yellow-300 hover:to-yellow-400"
                            >
                                Join Snitch
                            </button>
                        </div>
                    </div>
                </section>

                {products.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => {
                            const imageUrl = product.images?.[0]?.url || '/snitch_editorial_warm.png';

                            return (
                                <div
                                    key={product._id}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-500/50"
                                >
                                    <div className="aspect-4/5 overflow-hidden bg-zinc-800">
                                        <img src={imageUrl} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500">New Drop</p>
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{product.price?.currency || 'INR'}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-2">{product.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-zinc-100">{product.price?.amount?.toLocaleString() || '0'}</span>
                                            <span className="text-sm text-yellow-400">View details</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-zinc-900/70 p-10 text-center shadow-lg backdrop-blur-xl">
                        <h2 className="text-2xl font-semibold text-white">No pieces available yet.</h2>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">Our next collection is being prepared. Check back soon for the latest arrivals.</p>
                    </div>
                )}
            </div>

            <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">Snitch. © {new Date().getFullYear()}</footer>
        </div>
    );
};

export default Home;
