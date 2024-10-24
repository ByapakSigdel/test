'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import PocketBase from 'pocketbase';

interface Game {
  id: number;
  name: string;
  logo: string;
  link: string;
}

const Games: React.FC = () => {
  const router = useRouter();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [user, setUser] = useState({ username: '', totalAmount: 0 });

  const games: Game[] = [
    { id: 1, name: 'Spin and Win', logo: '3d-casino-slot-machine.jpg', link: './games/slot' },
    { id: 2, name: 'Lucky Slots', logo: 'another-game-logo.jpg', link: './games/slot' },
  ];

  useEffect(() => {
    setIsMounted(true);

    const fetchUserData = async () => {
      try {
        const authData = pb.authStore.model;
        if (authData) {
          const record = await pb.collection('users').getOne(authData.id);
          setUser({
            username: record.username,
            totalAmount: record.totalAmount,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (pb.authStore.isValid) {
      fetchUserData();
    }
  }, [pb]);

  const handleGameClick = (link: string) => {
    router.push(link);
  };

  const handleLogout = () => {
    pb.authStore.clear(); // Clear the authentication state
    router.push('/signin'); // Redirect to login page
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center opacity-80" style={{ backgroundImage: `url('/images/card-chips_generated.jpg')` }}>
        {/* User Info, Search Bar, and Logout Section */}
        <div className="flex items-center justify-between w-full mb-8 p-4">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-white" />
            <span className="text-xl text-white">{user.username || 'Username'}</span>
          </div>

          <input
            type="text"
            placeholder="Search a game..."
            onChange={(e) => setCurrentSearch(e.target.value.toLowerCase())}
            className="border rounded p-2 placeholder-black placeholder:font-bold text-black font-bold w-48 bg-blue-500 text-white"
          />

          <div className="flex items-center space-x-6">
            <div className="text-xl text-white">
              Total Amount: ${user.totalAmount || 0}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* <h1 className="text-4xl font-bold mb-8 text-black">Game Directory</h1> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {games
            .filter(game => game.name.toLowerCase().includes(currentSearch))
            .map((game) => (
              <div
                key={game.id}
                className="bg-white border border-gray-300 rounded-lg p-6 text-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <img src={`/images/${game.logo}`} alt={game.name} className="w-full h-40 object-cover rounded mb-2" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{game.name}</h2>
                <button
                  onClick={() => handleGameClick(game.link)}
                  className="mt-2 bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
                >
                  Play
                </button>
              </div>
            ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Games;