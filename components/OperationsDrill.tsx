import React, { useState } from 'react';
import { generateOperation, generateComparison } from '../utils/mathUtils';
import { Exercise } from '../types';
import { ArrowRight, HelpCircle } from 'lucide-react';

const OperationsDrill: React.FC = () => {
  const [mode, setMode] = useState<'compare' | 'add' | 'subtract' | 'multiply' | 'combined'>('add');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize first exercise
  React.useEffect(() => {
    nextExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const nextExercise = () => {
    setFeedback(null);
    setShowHint(false);
    if (mode === 'compare') {
        setCurrentExercise(generateComparison());
    } else {
        setCurrentExercise(generateOperation(mode));
    }
  };

  const handleAnswer = (val: number) => {
    if (!currentExercise) return;
    if (val === currentExercise.correctAnswer) {
      setFeedback('correct');
      setTimeout(nextExercise, 1200);
    } else {
      setFeedback('wrong');
      setShowHint(true);
    }
  };

  const getLabel = (m: string) => {
      switch(m) {
          case 'compare': return 'Konparatu (<,>)';
          case 'add': return 'Batuketak (+)';
          case 'subtract': return 'Kenketak (-)';
          case 'multiply': return 'Biderketak (·)';
          case 'combined': return 'Konbinatuak';
          default: return m;
      }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Mode Selection */}
      <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide">
        {(['compare', 'add', 'subtract', 'multiply', 'combined'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-4 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
              mode === m 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {getLabel(m)}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 min-h-[320px] flex flex-col items-center justify-center text-center relative">
        
        {/* Background Hint for Rules */}
        <div className="absolute top-4 right-4 opacity-20 pointer-events-none hidden md:block">
           {mode !== 'compare' && mode !== 'combined' && (
             <div className="text-xs font-mono text-right space-y-1">
               <div>+(+) → +</div>
               <div>-(-) → +</div>
               <div>+(-) → -</div>
               <div>-(+) → -</div>
             </div>
           )}
           {mode === 'combined' && (
             <div className="text-xs font-mono text-right space-y-1">
               <div>1. Parentesiak ()</div>
               <div>2. Biderketak (·)</div>
               <div>3. Batu/Kendu (+/-)</div>
             </div>
           )}
        </div>

        {currentExercise && (
            <>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-10 font-mono tracking-wider">
                {currentExercise.question} <span className="text-slate-300">?</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {currentExercise.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className="p-4 text-xl font-bold bg-slate-50 border-b-4 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:translate-y-1 active:border-b-0 active:translate-y-2 text-slate-700 transition-all"
                  >
                    {opt > 0 ? `+${opt}` : opt}
                  </button>
                ))}
              </div>

              <div className="h-12 mt-6 flex items-center justify-center">
                {feedback === 'correct' && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-lg animate-bounce">
                        Zuzena! Bikain!
                    </span>
                )}
                {feedback === 'wrong' && (
                    <div className="text-red-500 font-bold text-lg flex flex-col items-center animate-shake">
                        <span>Okerra... begiratu ondo zeinuak!</span>
                    </div>
                )}
              </div>

              {mode !== 'compare' && (
                  <div className={`mt-2 text-sm text-slate-500 transition-opacity duration-500 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
                    Aholkua: Zeinu berdinak → (+), Zeinu ezberdinak → (-)
                  </div>
              )}
              
              <button 
                onClick={nextExercise}
                className="mt-6 text-slate-400 hover:text-slate-600 flex items-center text-sm hover:underline"
              >
                Saltatu <ArrowRight size={14} className="ml-1" />
              </button>
            </>
        )}
      </div>
    </div>
  );
};

export default OperationsDrill;