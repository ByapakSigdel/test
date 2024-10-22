'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import ToggleSwitch from '@/components/ToggleSwitch';
import signupBg from '@/assets/signinbg.jpg'; // Import your background image

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const SignUpPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user with username and password
      await pb.collection('users').create({
        username,
        password,
        passwordConfirm: password, // Ensure password confirmation is included
      });
      await pb.collection('users').authWithPassword(username, password);
      router.push('/games'); // Redirect after successful sign up
    } catch (err) {
      console.error('Sign-up failed:', err);
    }
  };

  const toggleToSignIn = () => {
    router.push('/signin');
  };

  return (
    <div
      className="flex flex-col items-end justify-center h-screen"
      style={{
        backgroundImage: `url(${signupBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-80 text-white mr-32"> {/* Adjust margin as needed */}
        <ToggleSwitch isSignUp={true} onToggle={toggleToSignIn} />
        <form onSubmit={handleSignUp}>
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <div className="mb-6">
            <label className="block text-sm mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-opacity-60 bg-gray-800 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-opacity-60 bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
