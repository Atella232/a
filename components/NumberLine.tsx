import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const NumberLine: React.FC = () => {
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const range = Array.from({ length: 21 }, (_, i) => i - 10); // -10 to 10

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-100 my-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Zuzen Numerikoa</h3>
      <p className="text-slate-600 mb-6 text-sm">
        Egin klik zenbakietan. <span className="font-bold text-blue-600">Eskuinean</span> dauden zenbakiak beti handiagoak dira. <span className="font-bold text-red-500">Ezkerrean</span> daudenak, txikiagoak.
      </p>
      
      <div className="relative flex items-center justify-between h-24 px-4 overflow-x-auto md:overflow-hidden md:justify-center gap-1 md:gap-2 select-none">
        <div className="absolute w-full h-1 bg-slate-300 top-1/2 transform -translate-y-1/2 rounded-full z-0"></div>
        
        {range.map((num) => (
          <div key={num} className="relative z-10 flex flex-col items-center group">
            <div 
              className={`w-1 h-4 mb-2 ${num % 5 === 0 ? 'h-6 bg-slate-800' : 'bg-slate-400'}`}
            ></div>
            <button
              onClick={() => setHighlighted(num)}
              className={`
                w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${highlighted === num 
                  ? num < 0 ? 'bg-red-500 text-white scale-125 shadow-lg' : num > 0 ? 'bg-blue-500 text-white scale-125 shadow-lg' : 'bg-slate-800 text-white scale-125 shadow-lg'
                  : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'}
              `}
            >
              {num}
            </button>
            {/* Tooltip style indicator */}
            {highlighted === num && (
              <div className="absolute -bottom-12 whitespace-nowrap text-xs font-medium bg-slate-800 text-white px-2 py-1 rounded">
                {num < 0 ? 'Negatiboa' : num > 0 ? 'Positiboa' : 'Zeroa'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-8 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Txikiagoak</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Handiagoak</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default NumberLine;
