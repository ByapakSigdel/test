// app/auth/page.tsx
import React, { useState } from 'react';
import SignInPage from '@/app/signin/page'; // Adjust the import path
import SignUpPage from '@/app/signup/page'; // Adjust the import path
import ToggleSwitch from '@/components/ToggleSwitch';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <ToggleSwitch isSignUp={isSignUp} onToggle={handleToggle} />
        {isSignUp ? <SignUpPage /> : <SignInPage />}
      </div>
    </div>
  );
};

export default AuthPage;
