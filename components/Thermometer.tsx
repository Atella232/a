import React, { useState } from 'react';
import { Snowflake, Sun } from 'lucide-react';

const Thermometer: React.FC = () => {
  const [temp, setTemp] = useState<number>(5);

  // Calculate height percentage for the mercury (mapped -20 to 40)
  const getHeight = (t: number) => {
    // Range total = 60 (-20 to 40)
    const percentage = ((t + 20) / 60) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const getColor = (t: number) => {
    if (t > 25) return 'bg-red-500';
    if (t > 10) return 'bg-orange-400';
    if (t > 0) return 'bg-green-400';
    if (t > -5) return 'bg-blue-300';
    return 'bg-blue-600';
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Tenperatura eta Zenbakiak</h3>
        <p className="text-slate-600 text-sm">
          Termometroak zenbaki osoak ulertzeko balio du. 
          <br/><br/>
          Zero (0) erreferentzia da.
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Zerotik gora: <span className="text-green-600 font-bold">Positiboak (+)</span></li>
            <li>Zerotik behera: <span className="text-blue-600 font-bold">Negatiboak (-)</span></li>
          </ul>
        </p>
        
        <div className="pt-4">
          <label className="text-sm font-medium text-slate-700">Mugitu tenperatura:</label>
          <input 
            type="range" 
            min="-20" 
            max="40" 
            value={temp} 
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2 accent-slate-800"
          />
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
           <span className="text-3xl font-bold text-slate-800">{temp > 0 ? `+${temp}` : temp}°C</span>
           <p className="text-sm text-slate-500 mt-1">
             {temp > 0 ? 'Zero gainetik' : temp < 0 ? 'Zero azpitik' : 'Zero'}
           </p>
        </div>
      </div>

      <div className="relative h-64 w-16 bg-slate-200 rounded-full border-4 border-slate-300 flex justify-center shadow-inner">
        {/* Graduations */}
        <div className="absolute right-0 top-0 h-full w-full flex flex-col justify-between py-4 pr-1 text-[10px] text-slate-400 font-mono items-end">
           <span>40</span>
           <span>20</span>
           <span>0</span>
           <span>-20</span>
        </div>

        {/* Mercury */}
        <div 
          className={`absolute bottom-2 w-8 rounded-t-lg rounded-b-full transition-all duration-300 ${getColor(temp)} shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
          style={{ height: `${getHeight(temp)}%` }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            {temp < 0 ? <Snowflake size={20} className="text-blue-400 animate-pulse" /> : temp > 25 ? <Sun size={20} className="text-orange-500 animate-spin-slow" /> : null}
          </div>
        </div>
        
        {/* Zero line */}
        <div className="absolute bottom-[33.3%] w-full h-0.5 bg-slate-400 z-10 opacity-50 border-t border-dashed border-slate-600"></div>
      </div>
    </div>
  );
};

export default Thermometer;
