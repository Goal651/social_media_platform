'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
    names: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const [userData, setUserData] = useState<UserData>({
        names: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            names: userData.names,
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword
        }
        try {

            const response = await fetch('http://localhost:1000/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            if (response.ok) {
                navigate.push('/login');
            } else {
                setError(data.message || 'An error occurred');
            }
            setLoading(false);
        } catch (error) {
            console.error('Sign-up error:', error);
            setError('An error occurred during sign-up');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {error && (
                    <div className="p-4 text-red-400 bg-gray-800 border border-red-600 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="names"
                            placeholder="Full Name"
                            className="w-full p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            className="w-full p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="w-full p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="********"
                            className="w-full p-2 rounded"
                            onChange={handleChange}
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
                            Sign Up
                        </button>
                    )}

                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate.push('/login')}
                            className="w-full py-2 px-4 text-white bg-slate-600 hover:bg-slate-700 rounded-md"
                        >
                            Already have an account? Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
