'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

interface Game {
  id: number;
  name: string;
  link: string;
}

export default function Games() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Array of games
  const games: Game[] = [
    { id: 1, name: 'Spin and Win', link: '/games/slot' },
    // Add more games here
  ];

  // Ensure the component is mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGameClick = (link: string) => {
    router.push(link);
  };

  // Don't render anything until the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-400">
        <h1 className="text-4xl font-bold mb-8 text-white">Game Directory</h1>

        {/* Game Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white border border-gray-300 rounded-lg p-6 text-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              onClick={() => handleGameClick(game.link)}
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{game.name}</h2>
              <p className="text-gray-600">Click to play!</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
