// app/signin/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import ToggleSwitch from '@/components/ToggleSwitch';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email, password);
      router.push('/games'); // Redirect after successful sign in
    } catch (err) {
      console.error('Sign-in failed:', err);
    }
  };

  const toggleToSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <ToggleSwitch isSignUp={false} onToggle={toggleToSignUp} />
        <form onSubmit={handleSignIn}>
          <h1 className="text-xl font-semibold mb-4">Sign In</h1>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password:</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
