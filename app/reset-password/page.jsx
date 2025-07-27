'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use this to access the query parameters
import axios from 'axios';

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Access query params
    const token = searchParams.get('token'); // Get the token from the URL

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Invalid or expired token.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/auth/reset-password', { token, password });
            setSuccess(response.data.message);
            setTimeout(() => {
                router.push('/login'); // Redirect to login after successful reset
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#F2F2F2] h-screen flex justify-center items-center">
            <div className="max-w-[570px] w-full mx-auto bg-white p-8 rounded-2xl border border-gray-400">
                <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>

                {error && <p className="text-red-600 mb-3">{error}</p>}
                {success && <p className="text-green-600 mb-3">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ResetPassword;
