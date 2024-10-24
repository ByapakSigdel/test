import { NextApiRequest, NextApiResponse } from 'next';

const symbols = [
  { icon: '🍒', value: 1, payout: 2 },    // Cherry - lowest payout
  { icon: '🍋', value: 2, payout: 3 },    // Lemon
  { icon: '🍊', value: 3, payout: 4 },    // Orange
  { icon: '🍉', value: 4, payout: 5 },    // Watermelon
  { icon: '⭐', value: 5, payout: 10 },   // Star
  { icon: '💎', value: 6, payout: 15 },   // Diamond
  { icon: '🍀', value: 7, payout: 20 },   // Clover - highest payout
];

// Get a random position on each reel
const getRandomFinalPosition = () => {
  return Math.floor(Math.random() * symbols.length);
};

// Calculate the winnings based on final symbols and bet
const calculateWinnings = (finalSymbols: number[], bet: number): { winAmount: number; winningLines: number[][] } => {
  const reelSymbols = finalSymbols.map(pos => symbols[pos]);
  let winAmount = 0;
  const winningLines: number[][] = [];

  // Three of a kind (jackpot)
  if (reelSymbols[0].value === reelSymbols[1].value && reelSymbols[1].value === reelSymbols[2].value) {
    winAmount = bet * reelSymbols[0].payout;
    winningLines.push([0, 1, 2]);
  }
  // Two of a kind (from the left)
  else if (reelSymbols[0].value === reelSymbols[1].value) {
    winAmount = bet * (reelSymbols[0].payout / 4);
    winningLines.push([0, 1]);
  }

  return { winAmount, winningLines };
};

// The handler function to process game logic
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bet } = req.body;

    // Validate bet input
    if (typeof bet !== 'number' || bet <= 0) {
      return res.status(400).json({ error: 'Invalid bet amount. Bet must be a positive number.' });
    }

    // Generate random final positions for each reel
    const finalPositions = [
      getRandomFinalPosition(),
      getRandomFinalPosition(),
      getRandomFinalPosition(),
    ];

    // Calculate the winnings
    const { winAmount, winningLines } = calculateWinnings(finalPositions, bet);

    // Send response back with results
    return res.status(200).json({
      finalPositions,          // Array of reel positions
      winAmount,               // Amount won (if any)
      winningLines,            // Winning lines (if any)
      message: winAmount > 0 ? 'You won!' : 'Better luck next time!',  // Friendly message
    });
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
