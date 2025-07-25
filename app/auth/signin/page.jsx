'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Failed to sign in');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during sign in';
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-600 to-pink-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-sm tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-base text-gray-200 font-medium">
          Don’t have an account?{' '}
          <a
            href="/auth/signup"
            className="text-white-300 font-semibold hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 text-red-800 text-sm px-4 py-2 rounded-md border border-red-300">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-pink-500 hover:bg-purple-600 transition-all duration-300 text-white font-semibold py-2.5 px-4 rounded-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
