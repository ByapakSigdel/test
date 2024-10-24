//  'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// const symbols = [
//   { icon: '🍒', value: 1, payout: 2 },    // Cherry - lowest payout
//   { icon: '🍋', value: 2, payout: 3 },    // Lemon
//   { icon: '🍊', value: 3, payout: 4 },    // Orange
//   { icon: '🍉', value: 4, payout: 5 },    // Watermelon
//   { icon: '⭐', value: 5, payout: 10 },   // Star
//   { icon: '💎', value: 6, payout: 15 },   // Diamond
//   { icon: '🍀', value: 7, payout: 20 },   // Clover - highest payout
// ];

// // Sound URLs - using placeholder sounds that work in the browser
// const SOUNDS = {
//   SPIN: '/spin.mp3',
//   WIN: '/win.mp3',
//   REEL_STOP: '/stop.mp3',
//   COIN: '/coin.mp3'
// };

// const generateStrip = () => {
//   const strip = [];
//   for (let i = 0; i < 20; i++) {
//     strip.push(...symbols);
//   }
//   return strip;
// };

// export default function SlotMachine() {
//   const [credits, setCredits] = useState(1000);
//   const [bet, setBet] = useState(10);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [reelPositions, setReelPositions] = useState([0, 0, 0]);
//   const [winners, setWinners] = useState<number[][]>([]);
//   const [lastWin, setLastWin] = useState(0);
//   const [message, setMessage] = useState('');

//   // Refs for audio elements
//   const spinSound = useRef<HTMLAudioElement | null>(null);
//   const winSound = useRef<HTMLAudioElement | null>(null);
//   const reelStopSound = useRef<HTMLAudioElement | null>(null);
//   const coinSound = useRef<HTMLAudioElement | null>(null);
  
//   const strip = generateStrip();
//   const stripHeight = 100;

//   // Initialize sounds on the client side
//   useEffect(() => {
//     spinSound.current = new Audio(SOUNDS.SPIN);
//     winSound.current = new Audio(SOUNDS.WIN);
//     reelStopSound.current = new Audio(SOUNDS.REEL_STOP);
//     coinSound.current = new Audio(SOUNDS.COIN);

//     // Initialize sounds with lower volume
//     [spinSound, winSound, reelStopSound, coinSound].forEach(sound => {
//       if (sound.current) {
//         sound.current.volume = 0.3;
//       }
//     });
//   }, []);

//   const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
//     if (soundRef.current) {
//       soundRef.current.currentTime = 0;
//       soundRef.current.play().catch(e => console.log('Sound play failed:', e));
//     }
//   };

//   const getRandomFinalPosition = () => {
//     return Math.floor(Math.random() * symbols.length);
//   };

//   const calculateWinnings = (finalSymbols: number[]): { winAmount: number; winningLines: number[][] } => {
//     const reelSymbols = finalSymbols.map(pos => symbols[pos]);
//     let winAmount = 0;
//     const winningLines = [];

//     // Check for three of a kind
//     if (reelSymbols[0].value === reelSymbols[1].value && reelSymbols[1].value === reelSymbols[2].value) {
//       winAmount = bet * reelSymbols[0].payout;
//       winningLines.push([0, 1, 2]);
//     }
//     // Check for two of a kind (from left)
//     else if (reelSymbols[0].value === reelSymbols[1].value) {
//       winAmount = bet * (reelSymbols[0].payout / 4);
//       winningLines.push([0, 1]);
//     }
    
//     return { winAmount, winningLines };
//   };

//   const spinReels = async () => {
//     if (credits < bet || isSpinning) return;
    
//     setIsSpinning(true);
//     setWinners([]);
//     setLastWin(0);
//     setMessage('');
//     setCredits(prev => prev - bet);
//     playSound(spinSound);

//     // Generate random final positions for each reel
//     const finalPositions = [
//       getRandomFinalPosition(),
//       getRandomFinalPosition(),
//       getRandomFinalPosition()
//     ];

//     // Update positions with random results
//     setReelPositions(finalPositions);

//     // Stop reels sequentially
//     for (let i = 0; i < 3; i++) {
//       setTimeout(() => {
//         playSound(reelStopSound);
//       }, 1500 + (i * 500));
//     }

//     // Check results after all reels stop
//     setTimeout(() => {
//       const { winAmount, winningLines } = calculateWinnings(finalPositions);
      
//       if (winAmount > 0) {
//         playSound(winSound);
//         if (winAmount >= bet * 5) {
//           playSound(coinSound);
//           setMessage('BIG WIN! 🎉');
//         } else {
//           setMessage('Winner!');
//         }
//         setCredits(prev => prev + winAmount);
//         setLastWin(winAmount);
//         setWinners(winningLines);
//       } else {
//         setMessage('Try again!');
//       }
      
//       setIsSpinning(false);
//     }, 3000);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
//       <div className="bg-gradient-to-b from-yellow-600 to-yellow-800 p-8 rounded-xl shadow-2xl">
//         <h1 className="text-4xl font-bold mb-6 text-center text-white shadow-lg">Lucky Slots</h1>
        
//         {/* Message Display */}
//         <div className="text-center mb-4">
//           <motion.p
//             initial={{ scale: 0 }}
//             animate={{ scale: message ? 1 : 0 }}
//             className="text-2xl font-bold text-yellow-300"
//           >
//             {message}
//           </motion.p>
//         </div>

//         {/* Credits, Bet, and Last Win Display */}
//         <div className="flex justify-between mb-6">
//           <div className="bg-black p-2 rounded">
//             <p className="text-yellow-500">Credits: ${credits}</p>
//           </div>
//           <div className="bg-black p-2 rounded">
//             <p className="text-yellow-500">Bet: ${bet}</p>
//           </div>
//           <div className="bg-black p-2 rounded">
//             <p className="text-yellow-500">Last Win: ${lastWin}</p>
//           </div>
//         </div>

//         {/* Slot Machine Window */}
//         <div className="bg-black p-6 rounded-lg mb-6">
//           <div className="flex gap-4 overflow-hidden">
//             {[0, 1, 2].map((reelIndex) => (
//               <div
//                 key={reelIndex}
//                 className="relative w-24 h-24 bg-white/10 rounded-lg overflow-hidden"
//               >
//                 <motion.div
//                   className="absolute"
//                   animate={{
//                     y: isSpinning 
//                       ? [-stripHeight * (strip.length - symbols.length + reelPositions[reelIndex]), 0]
//                       : 0
//                   }}
//                   transition={{
//                     duration: 2 + (reelIndex * 0.5),
//                     delay: reelIndex * 0.2,
//                     ease: "easeOut"
//                   }}
//                 >
//                   {strip.map((symbol, idx) => (
//                     <div
//                       key={idx}
//                       className={`flex items-center justify-center h-24 text-6xl
//                         ${winners.some(line => line.includes(reelIndex)) ? 'text-yellow-400 animate-bounce' : ''}`}
//                     >
//                       {symbol.icon}
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex gap-4 justify-center items-center">
//           <button
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full w-20 text-sm disabled:opacity-50"
//             onClick={() => setBet(Math.max(10, bet - 10))}
//             disabled={isSpinning}
//           >
//             Bet -
//           </button>
          
//           <button
//             className={`px-8 py-4 rounded-full text-xl font-bold transition-all transform
//               ${isSpinning 
//                 ? 'bg-gray-600 cursor-not-allowed' 
//                 : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 hover:scale-105'
//               }`}
//             onClick={spinReels}
//             disabled={isSpinning || credits < bet}
//           >
//             {isSpinning ? 'Spinning...' : 'SPIN'}
//           </button>
 
//           <button
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full w-20 text-sm disabled:opacity-50"
//             onClick={() => setBet(Math.min(100, bet + 10))}
//             disabled={isSpinning}
//           >
//             Bet +
//           </button>
//         </div>

//         {/* Paytable */}
//         <div className="mt-6 bg-black/50 p-4 rounded-lg">
//           <h2 className="text-center text-yellow-500 mb-2">Paytable</h2>
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             {symbols.map(symbol => (
//               <div key={symbol.value} className="flex items-center gap-2">
//                 <span className="text-2xl">{symbol.icon}</span>
//                 <span>x3: {symbol.payout}x bet</span>
//               </div>
//             ))}
//           </div>
//           <p className="text-xs text-center mt-2 text-yellow-500">Two matching symbols from left pay 1/4 of three matching symbols</p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const symbols = [
  { icon: '🍒', value: 1, payout: 2 },    // Cherry - lowest payout
  { icon: '🍋', value: 2, payout: 3 },    // Lemon
  { icon: '🍊', value: 3, payout: 4 },    // Orange
  { icon: '🍉', value: 4, payout: 5 },    // Watermelon
  { icon: '⭐', value: 5, payout: 10 },   // Star
  { icon: '💎', value: 6, payout: 15 },   // Diamond
  { icon: '🍀', value: 7, payout: 20 },   // Clover - highest payout
];

// Sound URLs - using placeholder sounds that work in the browser
const SOUNDS = {
  SPIN: '/spin.mp3',
  WIN: '/win.mp3',
  REEL_STOP: '/stop.mp3',
  COIN: '/coin.mp3'
};

const generateStrip = () => {
  const strip = [];
  for (let i = 0; i < 20; i++) {
    strip.push(...symbols);
  }
  return strip;
};

export default function SlotMachine() {
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelPositions, setReelPositions] = useState([0, 0, 0]);
  const [winners, setWinners] = useState<number[][]>([]);
  const [lastWin, setLastWin] = useState(0);
  const [message, setMessage] = useState('');

  // Refs for audio elements
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const reelStopSound = useRef<HTMLAudioElement | null>(null);
  const coinSound = useRef<HTMLAudioElement | null>(null);
  
  const strip = generateStrip();
  const stripHeight = 100;

  // Initialize sounds on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      spinSound.current = new Audio(SOUNDS.SPIN);
      winSound.current = new Audio(SOUNDS.WIN);
      reelStopSound.current = new Audio(SOUNDS.REEL_STOP);
      coinSound.current = new Audio(SOUNDS.COIN);

      // Initialize sounds with lower volume
      [spinSound, winSound, reelStopSound, coinSound].forEach(sound => {
        if (sound.current) {
          sound.current.volume = 0.3;
        }
      });
    }
  }, []);

  const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(e => console.log('Sound play failed:', e));
    }
  };

  const spinReels = async () => {
    if (credits < bet || isSpinning) return;
    
    setIsSpinning(true);
    setWinners([]);
    setLastWin(0);
    setMessage('');
    setCredits(prev => prev - bet);
    playSound(spinSound);

    // Call the API to get the results
    const response = await fetch('/api/games_l/slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bet}),
    });

    const result = await response.json();

    if (response.ok) {
      const { finalPositions, winAmount, winningLines } = result;

      // Update reel positions with the final results
      setReelPositions(finalPositions);

      // Stop reels sequentially
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          playSound(reelStopSound);
        }, 1500 + (i * 500));
      }

      if (winAmount > 0) {
        playSound(winSound);
        if (winAmount >= bet * 5) {
          playSound(coinSound);
          setMessage('BIG WIN! 🎉');
        } else {
          setMessage('Winner!');
        }
        setCredits(prev => prev + winAmount);
        setLastWin(winAmount);
        setWinners(winningLines);
      } else {
        setMessage('Try again!');
      }
    } else {
      setMessage('Error: ' + result.error);
    }
    
    setIsSpinning(false);
  };
 
return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
        <div className="bg-gradient-to-b from-yellow-600 to-yellow-800 p-8 rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-white shadow-lg">Lucky Slots</h1>
          
          {/* Message Display */}
          <div className="text-center mb-4">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: message ? 1 : 0 }}
              className="text-2xl font-bold text-yellow-300"
            >
              {message}
            </motion.p>
          </div>
  
          {/* Credits, Bet, and Last Win Display */}
          <div className="flex justify-between mb-6">
            <div className="bg-black p-2 rounded">
              <p className="text-yellow-500">Credits: ${credits}</p>
            </div>
            <div className="bg-black p-2 rounded">
              <p className="text-yellow-500">Bet: ${bet}</p>
            </div>
            <div className="bg-black p-2 rounded">
              <p className="text-yellow-500">Last Win: ${lastWin}</p>
            </div>
          </div>
  
          {/* Slot Machine Window */}
          <div className="bg-black p-6 rounded-lg mb-6">
            <div className="flex gap-4 overflow-hidden">
              {[0, 1, 2].map((reelIndex) => (
                <div
                  key={reelIndex}
                  className="relative w-24 h-24 bg-white/10 rounded-lg overflow-hidden"
                >
                  <motion.div
                    className="absolute"
                    animate={{
                      y: isSpinning 
                        ? [-stripHeight * (strip.length - symbols.length + reelPositions[reelIndex]), 0]
                        : 0
                    }}
                    transition={{
                      duration: 2 + (reelIndex * 0.5),
                      delay: reelIndex * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    {strip.map((symbol, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-center h-24 text-6xl
                          ${winners.some(line => line.includes(reelIndex)) ? 'text-yellow-400 animate-bounce' : ''}`}
                      >
                        {symbol.icon}
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Controls */}
          <div className="flex gap-4 justify-center items-center">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full w-20 text-sm disabled:opacity-50"
              onClick={() => setBet(Math.max(10, bet - 10))}
              disabled={isSpinning}
            >
              Bet -
            </button>
            
            <button
              className={`px-8 py-4 rounded-full text-xl font-bold transition-all transform
                ${isSpinning 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 hover:scale-105'
                }`}
              onClick={spinReels}
              disabled={isSpinning || credits < bet}
            >
              {isSpinning ? 'Spinning...' : 'SPIN'}
            </button>
   
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full w-20 text-sm disabled:opacity-50"
              onClick={() => setBet(Math.min(100, bet + 10))}
              disabled={isSpinning}
            >
              Bet +
            </button>
          </div>
  
          {/* Paytable */}
          <div className="mt-6 bg-black/50 p-4 rounded-lg">
            <h2 className="text-center text-yellow-500 mb-2">Paytable</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {symbols.map(symbol => (
                <div key={symbol.value} className="flex items-center gap-2">
                  <span className="text-2xl">{symbol.icon}</span>
                  <span>x3: {symbol.payout}x bet</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-2 text-yellow-500">Two matching symbols from left pay 1/4 of three matching symbols</p>
          </div>
        </div>
      </div>
    );
  }
  