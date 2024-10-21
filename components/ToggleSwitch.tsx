// components/ToggleSwitch.tsx
import React from 'react';

interface ToggleSwitchProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isSignUp, onToggle }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        className={`px-4 py-2 rounded-l-lg transition-colors duration-300 ${!isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        onClick={onToggle}
      >
        Sign In
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg transition-colors duration-300 ${isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        onClick={onToggle}
      >
        Sign Up
      </button>
    </div>
  );
};

export default ToggleSwitch;
