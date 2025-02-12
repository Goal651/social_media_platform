'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginData = { email, password };

            const response = await fetch('http://localhost:1000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate.push('/dashboard');
            } else if (response.status === 403) {
                setError(data.message);
            } else {
                setError(data.message || 'Invalid credentials');
            }
            setLoading(false);
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-6  bg-gray-700  rounded-lg">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && (
                    <div className="p-4 text-red-400 bg-gray-800 border border-red-600 rounded">
                        {error}
                    </div>

                )}

                <form
                    onSubmit={handleLogin}
                    className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="john.doe@example.com"
                            className="w-full p-2  rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            className="w-full p-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                            Login
                        </button>
                    )}
                    <div
                    className='flex justify-center'>
                        <button
                            onClick={() => navigate.push('/register')}
                            className="w-full py-2 px-4 text-white bg-slate-600 hover:bg-slate-700 rounded-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
