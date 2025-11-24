import React, { useState, useEffect } from 'react';
import { generatePyramid } from '../utils/mathUtils';
import { PyramidCell } from '../types';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const MathPyramid: React.FC = () => {
  const [cells, setCells] = useState<PyramidCell[]>([]);
  const [userInputs, setUserInputs] = useState<{[key: string]: string}>({});
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const initGame = () => {
    const newCells = generatePyramid();
    setCells(newCells);
    setUserInputs({});
    setStatus('idle');
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [id]: value }));
    setStatus('idle');
  };

  const checkAnswers = () => {
    let allCorrect = true;
    cells.forEach(cell => {
      if (cell.isInput) {
        const userVal = parseInt(userInputs[cell.id]);
        if (userVal !== cell.value) {
          allCorrect = false;
        }
      }
    });
    setStatus(allCorrect ? 'correct' : 'incorrect');
  };

  // Helper to render a single block
  const renderBlock = (cell: PyramidCell) => {
    const isCorrect = status === 'correct';
    const isError = status === 'incorrect' && cell.isInput && parseInt(userInputs[cell.id]) !== cell.value;
    
    return (
      <div className="relative w-16 h-12 md:w-20 md:h-16 flex items-center justify-center">
        <div className={`
            absolute inset-0 border-2 rounded-lg shadow-sm flex items-center justify-center text-lg font-bold transition-colors
            ${cell.isInput 
                ? isError 
                    ? 'bg-red-50 border-red-300 text-red-800' 
                    : isCorrect 
                        ? 'bg-green-50 border-green-300 text-green-800' 
                        : 'bg-white border-indigo-200 text-slate-800' 
                : 'bg-slate-100 border-slate-300 text-slate-500 select-none'}
        `}>
            {cell.isInput ? (
                <input 
                    type="number" 
                    value={userInputs[cell.id] || ''}
                    onChange={(e) => handleInputChange(cell.id, e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-none appearance-none"
                    placeholder="?"
                />
            ) : (
                cell.value
            )}
        </div>
      </div>
    );
  };

  // Group cells by rows
  const rows = [
      cells.filter(c => c.row === 0),
      cells.filter(c => c.row === 1),
      cells.filter(c => c.row === 2),
  ];

  return (
    <div className="w-full p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-xl font-bold text-indigo-900">Piramide Magikoa</h3>
            <p className="text-sm text-indigo-600">Beheko bi laukien batura goikoa da.</p>
        </div>
        <button onClick={initGame} className="p-2 bg-white rounded-full shadow-sm hover:bg-indigo-100 transition-colors">
            <RefreshCw size={20} className="text-indigo-600" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 mb-8">
        {rows.map((row, i) => (
            <div key={i} className="flex gap-2">
                {row.sort((a,b) => a.col - b.col).map(cell => (
                    <div key={cell.id}>{renderBlock(cell)}</div>
                ))}
            </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button 
            onClick={checkAnswers}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
        >
            Egiaztatu
        </button>
        {status === 'correct' && (
            <div className="flex items-center text-green-600 font-bold animate-bounce">
                <CheckCircle size={20} className="mr-2" /> Oso ongi!
            </div>
        )}
        {status === 'incorrect' && (
            <div className="flex items-center text-red-500 font-bold">
                <AlertCircle size={20} className="mr-2" /> Saiatu berriro
            </div>
        )}
      </div>
    </div>
  );
};

export default MathPyramid;
