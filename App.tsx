import React, { useState } from 'react';
import { BookOpen, Calculator, Home, Layout, Star, Menu, X, ArrowRight } from 'lucide-react';
import Thermometer from './components/Thermometer';
import NumberLine from './components/NumberLine';
import MathPyramid from './components/MathPyramid';
import OperationsDrill from './components/OperationsDrill';
import WordProblems from './components/WordProblems';
import NumberLineHunt from './components/NumberLineHunt';
import ElevatorVisual from './components/ElevatorVisual';
import TrueFalseGame from './components/TrueFalseGame';
import MemoryGame from './components/MemoryGame';
import { SectionType } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>(SectionType.INTRO);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: SectionType.INTRO, label: 'Zer dira?', icon: <Home size={20} /> },
    { id: SectionType.NUMBER_LINE, label: 'Ordena', icon: <Layout size={20} /> },
    { id: SectionType.OPERATIONS, label: 'Eragiketak', icon: <Calculator size={20} /> },
    { id: SectionType.PROBLEMS, label: 'Problemak', icon: <BookOpen size={20} /> },
    { id: SectionType.GAMES, label: 'Jolastu', icon: <Star size={20} /> },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case SectionType.INTRO:
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Zenbaki Osoak
                </span>
              </h1>
              <p className="text-lg text-slate-600">
                Mundu errealean, zenbakiak ez dira beti positiboak. Zorrak, hotza, eta sotoak adierazteko... negatiboak behar ditugu!
              </p>
            </div>

            {/* Improved Layout: Stack columns on mobile, 2 cols on desktop. 
                Elevator gets its own nice container to avoid overlap */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Col: Thermometer */}
              <div className="glass-panel p-6 rounded-3xl shadow-xl flex flex-col">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Tenperatura</h2>
                <div className="flex-grow">
                    <Thermometer />
                </div>
              </div>
              
              {/* Right Col: Elevator & Sets */}
              <div className="flex flex-col gap-8 h-full">
                <div className="flex-grow">
                   <ElevatorVisual />
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Zenbaki multzoak</h2>
                    <p className="text-slate-600 text-sm mb-4">
                        <strong>N</strong> (Arruntak): 0, 1, 2, 3...<br/>
                        <strong>Z</strong> (Osoak): ...-3, -2, -1, 0, 1, 2, 3...
                    </p>
                    <div className="relative h-24 w-full flex items-center justify-center">
                        <div className="absolute w-48 h-20 border-2 border-purple-200 rounded-[50%] flex items-center justify-center z-0 bg-purple-50">
                            <span className="text-purple-300 font-bold absolute top-1 right-4">Z</span>
                        </div>
                        <div className="absolute w-24 h-12 border-2 border-blue-200 rounded-[50%] flex items-center justify-center z-10 bg-white">
                            <span className="text-blue-800 font-bold">N</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );

      case SectionType.NUMBER_LINE:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-10">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Ordena eta Zuzena</h2>
                <p className="text-slate-600 mt-2">Eskuinerantz handiagoak, ezkerrerantz txikiagoak.</p>
             </div>
             
             <NumberLine />
             
             <div className="my-8">
                <NumberLineHunt />
             </div>

             <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Balio Absolutua</h3>
                    <p className="text-slate-600 mb-4">Zenbaki batetik zerora dagoen distantzia da. Beti positiboa da.</p>
                    <div className="flex justify-around items-center text-lg font-mono bg-slate-50 p-4 rounded-xl">
                        <div>|-5| = <span className="text-blue-600 font-bold">5</span></div>
                        <div>|+3| = <span className="text-blue-600 font-bold">3</span></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Aurkakoa Aur()</h3>
                    <p className="text-slate-600 mb-4">Distantzia berdinera dagoen zenbakia, baina beste aldean.</p>
                    <div className="flex justify-around items-center text-lg font-mono bg-slate-50 p-4 rounded-xl">
                        <div>Aur(-5) = <span className="text-red-600 font-bold">+5</span></div>
                        <div>Aur(+4) = <span className="text-red-600 font-bold">-4</span></div>
                    </div>
                </div>
             </div>
          </div>
        );

      case SectionType.OPERATIONS:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-10">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Eragiketak</h2>
                <p className="text-slate-600 mt-2">Parentesiak kentzeko araua ikasi.</p>
             </div>

             {/* Simplified Sign Rules */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <div className="bg-green-500 text-white p-4 rounded-2xl text-center shadow-lg flex flex-col items-center justify-center">
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Berdinak</div>
                    <div className="text-2xl font-bold">+(+) → +</div>
                 </div>
                 <div className="bg-green-500 text-white p-4 rounded-2xl text-center shadow-lg flex flex-col items-center justify-center">
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Berdinak</div>
                    <div className="text-2xl font-bold">-(-) → +</div>
                 </div>
                 <div className="bg-red-500 text-white p-4 rounded-2xl text-center shadow-lg flex flex-col items-center justify-center">
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Ezberdinak</div>
                    <div className="text-2xl font-bold">+(-) → -</div>
                 </div>
                 <div className="bg-red-500 text-white p-4 rounded-2xl text-center shadow-lg flex flex-col items-center justify-center">
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Ezberdinak</div>
                    <div className="text-2xl font-bold">-(+) → -</div>
                 </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full">
                    <OperationsDrill />
                </div>
             </div>
          </div>
        );

      case SectionType.PROBLEMS:
        return (
           <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Problemak</h2>
                <p className="text-slate-600 mt-2">Erabili zenbaki osoak eguneroko egoeretan.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                  <WordProblems />
                  <WordProblems />
                  <WordProblems />
                  <WordProblems />
              </div>
              
              <div className="bg-indigo-50 rounded-2xl p-8 text-center border border-indigo-100">
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Gogoratu!</h3>
                  <p className="text-indigo-700">
                    "Zorrak", "gastatu" eta "K.a." negatiboak dira.<br/>
                    "Irabazi", "eman" eta "K.o." positiboak dira.
                  </p>
              </div>
           </div>
        );
      
      case SectionType.GAMES:
          return (
              <div className="space-y-12 animate-in slide-in-from-right duration-500 pb-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Jolas Gunea</h2>
                    <p className="text-slate-600 mt-2">Ikasi jolasten!</p>
                  </div>
                  
                  <div className="grid gap-8">
                      {/* Game 1: Pyramid */}
                      <div className="bg-white/50 p-4 rounded-3xl border border-slate-200">
                          <div className="mb-4 flex items-center gap-2">
                              <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">1</span>
                              <h3 className="text-xl font-bold text-slate-700">Piramide Magikoa</h3>
                          </div>
                          <div className="max-w-2xl mx-auto">
                            <MathPyramid />
                          </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                         {/* Game 2: True/False */}
                         <div className="bg-white/50 p-4 rounded-3xl border border-slate-200 h-full">
                             <div className="mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">2</span>
                                <h3 className="text-xl font-bold text-slate-700">Egia ala Gezurra?</h3>
                             </div>
                             <TrueFalseGame />
                         </div>

                         {/* Game 3: Memory */}
                         <div className="bg-white/50 p-4 rounded-3xl border border-slate-200 h-full">
                             <div className="mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">3</span>
                                <h3 className="text-xl font-bold text-slate-700">Bikoteak</h3>
                             </div>
                             <MemoryGame />
                         </div>
                      </div>
                  </div>
              </div>
          );

      default:
        return <div>Atala eraikitzen...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentSection(SectionType.INTRO)}>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
              <span className="font-bold text-xl tracking-tight text-slate-800">ZenbakiOsoak</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${currentSection === item.id 
                      ? 'bg-slate-800 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-lg z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                    ${currentSection === item.id 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-600'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-5xl mx-auto py-6 px-4 text-center text-slate-500 text-sm">
          <p>Eremu Zientifiko Matematikoa - 1. DBH</p>
          <p className="mt-1 opacity-75">Ikasleentzako material didaktikoa</p>
        </div>
      </footer>
    </div>
  );
}

export default App;