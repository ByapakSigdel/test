// /app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import ToggleSwitch from '@/components/ToggleSwitch';
import Captcha from '@/components/Captcha';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const SignUpPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    // Verify CAPTCHA token with your backend
    const isCaptchaValid = await validateCaptcha(captchaToken);
    if (!isCaptchaValid) {
      alert('Invalid CAPTCHA');
      return;
    }

    try {
      await pb.collection('users').create({
        username,
        password,
        passwordConfirm: password,
      });
      await pb.collection('users').authWithPassword(username, password);
      router.push('/games'); // Redirect after successful sign up
    } catch (err) {
      console.error('Sign-up failed:', err);
    }
  };

  const validateCaptcha = async (token: string) => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      return data.message === 'Success';
    } catch (err) {
      console.error('Captcha validation failed:', err);
      return false;
    }
  };

  const toggleToSignIn = () => {
    router.push('/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <ToggleSwitch isSignUp={true} onToggle={toggleToSignIn} />
        <form onSubmit={handleSignUp}>
          <h1 className="text-xl font-semibold mb-4">Sign Up</h1>
          <div className="mb-4">
            <label className="block text-sm mb-1">Username:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Captcha onVerify={(token) => setCaptchaToken(token)} />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors duration-200 mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
