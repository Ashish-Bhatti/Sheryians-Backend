import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).slice(0, remaining);
        const newImages = toAdd.map((file) => ({ file, preview: URL.createObjectURL(file) }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        },
        [images]
    );

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const removeImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);
            images.forEach((img) => data.append('images', img.file));
            await handleCreateProduct(data);
            navigate('/');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        'w-full rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500';
    const selectClass =
        'w-full rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500';

    return (
        <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-200">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-[130px]" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-600/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6 xl:px-10">
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400 transition hover:border-yellow-500 hover:text-yellow-400"
                        aria-label="Go back"
                    >
                        ← Back
                    </button>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-500">Snitch.</span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
                    <div className="mb-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-500">Seller Dashboard</p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Create a New Listing</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                            Build a polished product page with a clear story, a strong price point, and compelling imagery.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="cp-title" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                        Product Title
                                    </label>
                                    <input
                                        id="cp-title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Oversized Linen Shirt"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="cp-description" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                        Description
                                    </label>
                                    <textarea
                                        id="cp-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Describe the product — material, fit, details..."
                                        className="min-h-32.5 w-full rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Price</label>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Amount</span>
                                            <input
                                                id="cp-priceAmount"
                                                type="number"
                                                name="priceAmount"
                                                value={formData.priceAmount}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Currency</span>
                                            <select id="cp-priceCurrency" name="priceCurrency" value={formData.priceCurrency} onChange={handleChange} className={selectClass}>
                                                {CURRENCIES.map((c) => (
                                                    <option key={c} value={c} className="bg-zinc-950 text-zinc-100">
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Images</label>
                                    <span className="text-[10px] text-zinc-500">
                                        {images.length}/{MAX_IMAGES}
                                    </span>
                                </div>

                                {images.length < MAX_IMAGES && (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-10 text-center transition-all duration-300 sm:py-14 ${
                                            isDragging ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-zinc-950/40'
                                        }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-full border ${isDragging ? 'border-yellow-500 text-yellow-400' : 'border-white/10 text-zinc-500'}`}
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-zinc-300">
                                                Drop images here or <span className="font-semibold text-yellow-500">tap to upload</span>
                                            </p>
                                            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-zinc-500">Up to {MAX_IMAGES} images</p>
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                                    </div>
                                )}

                                {images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                                        {images.map((img, index) => (
                                            <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-800">
                                                <img src={img.preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                                    aria-label={`Remove image ${index + 1}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-2xl bg-linear-to-r from-yellow-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:from-yellow-300 hover:to-yellow-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
