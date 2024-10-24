// /app/signin/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import ToggleSwitch from '@/components/ToggleSwitch';
/* import Captcha from '@/components/Captcha'; */
import signinBg from '../../assets/signinbg.jpg'; // Adjust the path according to your structure

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const SignInPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Change from email to username
  const [password, setPassword] = useState('');
/*   const [captchaToken, setCaptchaToken] = useState<string | null>(null); */

  const handleSignIn = async (e: React.FormEvent) => {
     e.preventDefault();
    /* if (!captchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    // Verify CAPTCHA token with your backend
    const isCaptchaValid = await validateCaptcha(captchaToken);
    if (!isCaptchaValid) {
      alert('Invalid CAPTCHA');
      return;
    } */

    try {
      await pb.collection('users').authWithPassword(username, password,{autoCancel: false,});
      
      router.push('/games'); // Redirect after successful sign in
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };

/*   const validateCaptcha = async (token: string) => {
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
  }; */

  const toggleToSignUp = () => {
    router.push('/signup');
  };
  return (
    <div
      className="flex flex-col items-end justify-center h-screen"
      style={{
        backgroundImage: `url(${signinBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-100 text-white mr-32">
        <ToggleSwitch isSignUp={false} onToggle={toggleToSignUp} />
        <form onSubmit={handleSignIn}>
          <h1 className="text-xl font-semibold mb-4">Sign In</h1>
          <div className="mb-4">
            <label className="block text-sm mb-1">Username:</label> {/* Change label to Username */}
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
          {/* <Captcha onVerify={(token) => setCaptchaToken(token)} /> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-4 font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignInPage;
