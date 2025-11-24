import React from 'react';

const ElevatorVisual: React.FC = () => {
  // Floors from 3 down to -3
  const floors = [3, 2, 1, 0, -1, -2, -3];

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center gap-6 h-full">
        <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-2">Igogailua</h2>
            <p className="opacity-90 text-sm">
                Eraikinetan, sotoak adierazteko zenbaki negatiboak erabiltzen ditugu.
                <br/><br/>
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">0 solairua</span> = Behea
                <br/>
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">-1 solairua</span> = 1. Sotoa
            </p>
        </div>
        
        {/* Vertical Elevator Shaft */}
        <div className="bg-blue-900/40 p-4 rounded-xl border-2 border-blue-300/30 relative min-w-[120px]">
            {/* Cable */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-slate-400/30 z-0"></div>
            
            <div className="flex flex-col gap-2 relative z-10">
                {floors.map(floor => (
                    <div key={floor} className="flex items-center gap-3 group">
                        {/* Floor Box */}
                        <div className={`w-14 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-lg shadow-md transition-all duration-300
                            ${floor === 0 
                                ? 'bg-white border-white text-blue-900 scale-110 ring-4 ring-blue-300/50 z-10' 
                                : floor > 0 
                                    ? 'bg-sky-500 border-sky-400 text-white hover:bg-sky-400' 
                                    : 'bg-indigo-700 border-indigo-500 text-white hover:bg-indigo-600'
                            }`}>
                            {floor}
                        </div>
                        {/* Label */}
                        <span className="text-[10px] uppercase tracking-wider opacity-80 font-bold w-16 text-left drop-shadow-md">
                            {floor === 0 ? 'Behea' : floor > 0 ? `${floor}. Sol` : `Soto ${Math.abs(floor)}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ElevatorVisual;