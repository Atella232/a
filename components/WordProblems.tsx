import React, { useState } from 'react';
import { generateWordProblem } from '../utils/mathUtils';
import { WordProblem } from '../types';
import { ArrowRight, Lightbulb } from 'lucide-react';

const WordProblems: React.FC = () => {
  const [problem, setProblem] = useState<WordProblem>(generateWordProblem());
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (parseInt(answer) === problem.correctAnswer) {
        setStatus('correct');
    } else {
        setStatus('wrong');
    }
  };

  const next = () => {
    setProblem(generateWordProblem());
    setAnswer('');
    setStatus('idle');
    setShowHint(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-100 h-full flex flex-col">
        <div className="flex-grow">
            <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full">Problema</span>
            </div>
            
            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                {problem.text}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <div className="flex items-center gap-4">
                    <input 
                        type="number" 
                        value={answer}
                        onChange={(e) => {
                            setStatus('idle');
                            setAnswer(e.target.value);
                        }}
                        placeholder="?"
                        className="w-full p-3 text-xl rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    />
                    <span className="text-slate-500 font-bold whitespace-nowrap">{problem.unit}</span>
                </div>
            </div>

            {status === 'wrong' && !showHint && (
                <button 
                    onClick={() => setShowHint(true)}
                    className="text-sm text-amber-600 flex items-center gap-1 hover:underline mb-4"
                >
                    <Lightbulb size={14} /> Pistatxo bat nahi?
                </button>
            )}

            {showHint && (
                <div className="mb-4 text-sm text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 animate-in fade-in">
                    Pista: {problem.hint}
                </div>
            )}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
             <div className="h-6">
                {status === 'correct' && <span className="text-green-600 font-bold animate-pulse">Zuzena! Oso ongi!</span>}
                {status === 'wrong' && <span className="text-red-500 font-bold">Saiatu berriro...</span>}
             </div>

             {status === 'correct' ? (
                 <button onClick={next} className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 flex items-center gap-2 transition-colors">
                     Hurrengoa <ArrowRight size={16} />
                 </button>
             ) : (
                 <button onClick={handleCheck} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95">
                     Egiaztatu
                 </button>
             )}
        </div>
    </div>
  );
};

export default WordProblems;