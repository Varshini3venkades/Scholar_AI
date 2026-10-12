import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function DashboardOverview({ 
  stats, 
  student, 
  onOpenProfile, 
  onNavigateToScholarships,
  onOpenAidCalculator
}) {
  return (
    <div className="space-y-6">
      
      {/* Student Profile Quick Banner */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-neonPurple/30 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-neonPurple/10 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-neonPurple to-indigo-600 flex items-center justify-center text-white shadow-glow-purple border border-neonPurple-light/50 flex-shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Welcome, {student.fullName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Profile Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{student.degree}</span>
                <span>•</span>
                <span>{student.yearOfStudy}</span>
                <span>•</span>
                <span>{student.state}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-navy-950/60 p-2.5 rounded-2xl border border-white/5">
            <div className="px-3 py-1.5 rounded-xl bg-navy-800/80 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">10th Marks</span>
              <span className="text-xs sm:text-sm font-bold text-white">{student.tenthMarks}%</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-navy-800/80 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">12th Marks</span>
              <span className="text-xs sm:text-sm font-bold text-white">{student.twelfthMarks}%</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-navy-800/80 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">CGPA</span>
              <span className="text-xs sm:text-sm font-bold text-gold">{student.cgpa} / 10</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-navy-800/80 border border-white/10 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Income</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">₹{(student.annualIncome / 100000).toFixed(1)} LPA</span>
            </div>

            <button
              onClick={onOpenProfile}
              className="px-3 py-2 rounded-xl bg-neonPurple/20 hover:bg-neonPurple/30 text-neonPurple-light text-xs font-bold border border-neonPurple/40 transition-all ml-1"
            >
              Edit Criteria
            </button>
          </div>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Total Eligible */}
        <div 
          onClick={onNavigateToScholarships}
          className="glass-card p-6 rounded-3xl border border-neonPurple/30 hover:border-neonPurple cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Total Eligible
            </span>
            <div className="w-10 h-10 rounded-xl bg-neonPurple/20 border border-neonPurple/40 flex items-center justify-center text-neonPurple-light group-hover:scale-110 transition-transform shadow-glow-purple">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              {stats.eligibleCount}
            </span>
            <span className="text-xs text-slate-400">
              of {stats.evaluatedList.length} scanned
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-2">
            Scholarships fully matching your marks, income, and stream.
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-neonPurple-light group-hover:text-gold transition-colors">
            <span>Review Eligible Cards</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Strong Matches */}
        <div 
          onClick={onNavigateToScholarships}
          className="glass-card p-6 rounded-3xl border border-gold/30 hover:border-gold cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Strong Matches
            </span>
            <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-glow-gold">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-gold">
              {stats.strongMatchCount}
            </span>
            <span className="text-xs text-gold/80">
              High Probability
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-2">
            Top echelon schemes with &gt;= 88% transparent match score.
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gold group-hover:text-white transition-colors">
            <span>Prioritize Applications</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Upcoming Deadlines */}
        <div 
          onClick={onNavigateToScholarships}
          className="glass-card p-6 rounded-3xl border border-rose-500/30 hover:border-rose-500 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Upcoming Deadlines
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              {stats.urgentDeadlinesCount}
            </span>
            <span className="text-xs text-rose-400 font-semibold">
              Closing &le; 30 Days
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-2">
            Urgent programs requiring immediate document preparation.
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:text-white transition-colors">
            <span>View Closing Dates</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Estimated Aid Pool */}
        <div 
          onClick={onOpenAidCalculator}
          className="glass-card p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-500 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Estimated Financial Aid
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              ₹{(stats.totalEstimatedAid / 100000).toFixed(2)}L
            </span>
            <span className="text-xs text-emerald-400">
              Potential / yr
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-2">
            Sum of annual grants from all currently matched scholarships.
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-white transition-colors">
            <span>Calculate Funding Gap</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Urgent Deadline Notification Strip */}
      {stats.urgentDeadlinesCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 animate-bounce" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gold">
                Action Required: {stats.urgentDeadlinesCount} eligible scholarships are closing this month.
              </p>
              <p className="text-[11px] text-slate-300">
                Ensure your Income Certificate, Bonafide letter, and 12th marksheets are digitized.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToScholarships}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold text-xs font-bold border border-gold/40 transition-all"
          >
            Review Now
          </button>
        </div>
      )}

    </div>
  );
}
