import React, { useState, useEffect } from 'react';
import { generateNumberLinePoints } from '../utils/mathUtils';
import { NumberLinePoint } from '../types';
import { RefreshCw, Check, X } from 'lucide-react';

const NumberLineHunt: React.FC = () => {
  const [points, setPoints] = useState<NumberLinePoint[]>([]);
  const [inputs, setInputs] = useState<{[key: string]: string}>({});
  const [checked, setChecked] = useState(false);

  const initGame = () => {
    setPoints(generateNumberLinePoints());
    setInputs({});
    setChecked(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCheck = () => {
    setChecked(true);
  };

  // Range for the visual line
  const range = Array.from({ length: 15 }, (_, i) => i - 7); // -7 to 7

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800">Non daude?</h3>
                <p className="text-slate-600 text-sm">Idatzi letra bakoitzari dagokion zenbaki osoa.</p>
            </div>
            <button onClick={initGame} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                <RefreshCw size={18} className="text-slate-500" />
            </button>
        </div>

        {/* The Line */}
        <div className="relative h-24 flex items-center justify-center mb-8 overflow-x-auto">
             <div className="absolute w-[90%] h-1 bg-slate-800 rounded-full"></div>
             <div className="relative flex justify-between w-[90%] min-w-[600px]">
                 {range.map(num => {
                     const point = points.find(p => p.value === num);
                     return (
                        <div key={num} className="flex flex-col items-center relative group">
                            {/* Point Marker */}
                            <div className="w-0.5 h-4 bg-slate-800 mb-2"></div>
                            <span className="text-xs text-slate-400 font-mono">{num}</span>
                            
                            {/* The Letter Label (if exists) */}
                            {point && (
                                <div className="absolute -top-8 flex flex-col items-center animate-bounce-small">
                                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-md z-10">
                                        {point.label}
                                    </div>
                                    <div className="w-0.5 h-4 bg-indigo-600"></div>
                                </div>
                            )}
                        </div>
                     );
                 })}
             </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {points.map(p => {
                const val = inputs[p.id] || '';
                const isCorrect = parseInt(val) === p.value;
                
                return (
                    <div key={p.id} className="flex flex-col items-center">
                        <label className="font-bold text-indigo-900 mb-1 text-lg">{p.label} =</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={val}
                                onChange={(e) => {
                                    setChecked(false);
                                    setInputs({...inputs, [p.id]: e.target.value});
                                }}
                                className={`w-20 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-colors ${
                                    checked 
                                        ? isCorrect 
                                            ? 'border-green-500 bg-green-50 text-green-700' 
                                            : 'border-red-500 bg-red-50 text-red-700'
                                        : 'bg-white border-slate-200 focus:border-indigo-500 text-slate-800'
                                }`}
                            />
                            {checked && (
                                <div className="absolute -right-6 top-3">
                                    {isCorrect ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="mt-8 text-center">
            <button 
                onClick={handleCheck}
                disabled={Object.keys(inputs).length < 3}
                className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
                Egiaztatu
            </button>
        </div>
    </div>
  );
};

export default NumberLineHunt;