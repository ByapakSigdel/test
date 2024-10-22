 'use client';
import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import './Games.css'; // You will create this CSS file for the spinner

export default function Games() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [guess, setGuess] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(100); // Initial points
  const [message, setMessage] = useState<string>('');

  const numbers = [0, 1, 2, 3, 4, 5]; // Numbers on the spinner

  const spinAndWin = () => {
    if (points < 10) {
      setMessage('Not enough points to play.');
      return;
    }
    if (guess === null) {
      setMessage('Please enter your guess.');
      return;
    }

    setIsSpinning(true);
    setPoints(points - 10); // Deduct points for guessing
    setMessage('');

    // Simulate spin
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const spunNumber = numbers[randomIndex];
      setResult(spunNumber);

      if (spunNumber === guess) {
        setPoints(points + 20); // Add points for correct guess
        setMessage(`Correct! You won 20 points. The number was ${spunNumber}.`);
      } else {
        setMessage(`Wrong guess! The number was ${spunNumber}.`);
      }

      setIsSpinning(false);
    }, 3000); // Spin for 3 seconds
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Spin and Win</h1>
        <div className="mb-4">Points: {points}</div>

        <input
          type="number"
          min="0"
          max="5"
          value={guess ?? ''}
          onChange={(e) => setGuess(Number(e.target.value))}
          placeholder="Enter your guess (0-5)"
          className="mb-4 p-2 border rounded"
        />

        <div className="spinner-container">
          <div className={`spinner ${isSpinning ? 'spinning' : ''}`}>
            {numbers.map((num) => (
              <div key={num} className="spinner-number">
                {num}
              </div>
            ))}
          </div>
          <div className="spinner-pointer">▼</div>
        </div>

        <button
          onClick={spinAndWin}
          disabled={isSpinning || guess === null}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          {isSpinning ? 'Spinning...' : 'Spin Now!'}
        </button>

        {message && <div className="mt-4 text-lg">{message}</div>}
      </div>
    </ProtectedRoute>
  );
}
