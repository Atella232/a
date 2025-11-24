import React, { useState, useEffect } from 'react';
import { generateMemoryDeck } from '../utils/mathUtils';
import { MemoryCard } from '../types';
import { RefreshCw } from 'lucide-react';

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selected, setSelected] = useState<MemoryCard[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
      restart();
  }, []);

  const restart = () => {
      setCards(generateMemoryDeck());
      setSelected([]);
      setIsLocked(false);
  };

  const handleCardClick = (card: MemoryCard) => {
      if (isLocked || card.isFlipped || card.isMatched) return;

      const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
      setCards(newCards);

      const newSelected = [...selected, card];
      setSelected(newSelected);

      if (newSelected.length === 2) {
          setIsLocked(true);
          checkMatch(newSelected, newCards);
      }
  };

  const checkMatch = (currentSelected: MemoryCard[], currentCards: MemoryCard[]) => {
      const [c1, c2] = currentSelected;
      const isMatch = c1.matchId === c2.matchId;

      setTimeout(() => {
          setCards(prev => prev.map(c => {
              if (c.id === c1.id || c.id === c2.id) {
                  return isMatch ? { ...c, isMatched: true } : { ...c, isFlipped: false };
              }
              return c;
          }));
          setSelected([]);
          setIsLocked(false);
      }, 1000);
  };

  const allMatched = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Bikoteak Bilatu</h3>
            <button onClick={restart} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                <RefreshCw size={18} />
            </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
            {cards.map(card => (
                <button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className={`
                        aspect-square rounded-xl flex items-center justify-center text-sm md:text-lg font-bold transition-all duration-500 transform perspective-1000
                        ${card.isFlipped || card.isMatched 
                            ? 'bg-indigo-600 text-white rotate-y-180' 
                            : 'bg-slate-200 text-transparent hover:bg-slate-300'}
                        ${card.isMatched ? 'opacity-50 cursor-default' : ''}
                    `}
                >
                    {(card.isFlipped || card.isMatched) && card.content}
                </button>
            ))}
        </div>

        {allMatched && (
            <div className="mt-6 text-center p-4 bg-green-100 text-green-800 rounded-xl font-bold animate-bounce">
                Zorionak! Guztiak aurkitu dituzu! 🎉
            </div>
        )}
    </div>
  );
};

export default MemoryGame;