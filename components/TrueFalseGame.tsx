import React, { useState, useEffect } from 'react';
import { generateTrueFalse } from '../utils/mathUtils';
import { TrueFalseQuestion } from '../types';
import { Check, X, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';

const TrueFalseGame: React.FC = () => {
  const [q, setQ] = useState<TrueFalseQuestion>(generateTrueFalse());
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleGuess = (guess: boolean) => {
    if (status !== 'idle') return;

    if (guess === q.isTrue) {
        setStatus('correct');
        setStreak(s => s + 1);
    } else {
        setStatus('wrong');
        setStreak(0);
    }
  };

  const next = () => {
      setQ(generateTrueFalse());
      setStatus('idle');
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
      {/* Streak Counter */}
      <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
          Racha: {streak} 🔥
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-6">Egia ala Gezurra?</h3>

      <div className="w-full py-12 bg-slate-50 rounded-2xl border-2 border-slate-200 mb-8 flex items-center justify-center">
         <span className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-wider">
             {q.statement}
         </span>
      </div>

      {status === 'idle' && (
          <div className="flex gap-4 w-full max-w-xs">
              <button 
                onClick={() => handleGuess(false)}
                className="flex-1 py-4 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex flex-col items-center gap-2 border border-red-200"
              >
                  <ThumbsDown /> Gezurra
              </button>
              <button 
                onClick={() => handleGuess(true)}
                className="flex-1 py-4 bg-green-100 text-green-600 rounded-xl font-bold hover:bg-green-200 transition-colors flex flex-col items-center gap-2 border border-green-200"
              >
                  <ThumbsUp /> Egia
              </button>
          </div>
      )}

      {status !== 'idle' && (
          <div className="animate-in fade-in zoom-in duration-300 w-full">
              <div className={`p-4 rounded-xl mb-4 ${status === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center justify-center gap-2 font-bold text-lg mb-1">
                      {status === 'correct' ? <Check /> : <X />}
                      {status === 'correct' ? 'Zuzena!' : 'Okerra!'}
                  </div>
                  <p className="text-sm opacity-90">{q.explanation}</p>
              </div>
              <button 
                onClick={next}
                className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
              >
                  Hurrengoa
              </button>
          </div>
      )}
    </div>
  );
};

export default TrueFalseGame;