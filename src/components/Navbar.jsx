import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  User, 
  Edit3, 
  Calculator, 
  BookmarkCheck, 
  LayoutDashboard,
  Layers
} from 'lucide-react';

export function Navbar({ 
  student, 
  onOpenProfile, 
  activeTab, 
  setActiveTab,
  eligibleCount 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-900/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-neonPurple-dark via-neonPurple to-indigo-500 shadow-glow-purple border border-neonPurple-light/40 group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-white" />
            <Sparkles className="w-3.5 h-3.5 text-gold absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Scholar<span className="text-gold">Match</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-neonPurple/20 text-neonPurple-light border border-neonPurple/40">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              AI-Powered Scholarship & Financial Aid Assistant
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-navy-850/80 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-neonPurple text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
            {eligibleCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gold text-navy-950 font-bold ml-1">
                {eligibleCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('scholarships')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'scholarships'
                ? 'bg-neonPurple text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Scholarships</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'calculator'
                ? 'bg-neonPurple text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Aid Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'tracker'
                ? 'bg-neonPurple text-white shadow-glow-purple'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Applications</span>
          </button>
        </nav>

        {/* Profile Pill & Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-navy-800/90 hover:bg-navy-700/90 border border-neonPurple/40 hover:border-gold/60 text-white transition-all duration-200 group shadow-sm hover:shadow-glow-purple"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-neonPurple to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>{student.fullName}</span>
                <span className="text-[10px] text-gold font-bold">({student.cgpa} CGPA)</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">
                {student.degreeShort || "B.Tech"} • {student.yearOfStudy}
              </p>
            </div>
            <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors ml-1" />
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-navy-950/90 border-t border-white/5">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] py-1 px-2.5 rounded-lg font-medium ${
            activeTab === 'dashboard' ? 'text-gold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('scholarships')}
          className={`flex flex-col items-center gap-1 text-[11px] py-1 px-2.5 rounded-lg font-medium ${
            activeTab === 'scholarships' ? 'text-gold' : 'text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Scholarships</span>
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex flex-col items-center gap-1 text-[11px] py-1 px-2.5 rounded-lg font-medium ${
            activeTab === 'calculator' ? 'text-gold' : 'text-slate-400'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Calculator</span>
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex flex-col items-center gap-1 text-[11px] py-1 px-2.5 rounded-lg font-medium ${
            activeTab === 'tracker' ? 'text-gold' : 'text-slate-400'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>Tracker</span>
        </button>
      </div>
    </header>
  );
}
