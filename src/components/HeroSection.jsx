import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Award,
  CheckCircle2,
  Zap,
  Sliders
} from 'lucide-react';

export function HeroSection({ 
  student, 
  onGetStarted, 
  onOpenProfile, 
  stats 
}) {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="ambient-glow-orb-1 top-0 left-1/4 -translate-x-1/2 opacity-70" />
      <div className="ambient-glow-orb-2 top-20 right-10 opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-neonPurple/40 shadow-glow-purple text-xs font-semibold text-slate-200">
            <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>AI Matching Engine v2.4 Live: 10th & 12th Marks + CGPA + Income Verification</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-tight">
            Stop Guessing Scholarship Eligibility. <br className="hidden sm:block" />
            Let <span className="gradient-text-ai">ScholarMatch AI</span> Find Your Exact Grants.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Personalized financial aid matching evaluated against official criteria, income thresholds, 
            and academic benchmarks. Get transparent match explanations, funding gap calculations, and direct official portal links.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-neonPurple-dark via-neonPurple to-indigo-600 hover:from-neonPurple hover:to-indigo-500 shadow-glow-purple-lg border border-neonPurple-light/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Explore My {stats.eligibleCount} Matched Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 glass-card hover:bg-white/10 hover:border-gold/60 border border-white/10 transition-all duration-200"
            >
              <Sliders className="w-4 h-4 text-gold" />
              <span>Customize Profile & Marks</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent AI Match Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyberCyan-light" />
              <span>Authentic Official Portals Only (No Fake URLs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-gold" />
              <span>Zero Fabrication • Real Criteria</span>
            </div>
          </div>

        </div>

        {/* Live Hero Stats Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-neonPurple/20 text-center">
            <div className="flex items-center justify-center mb-1 text-neonPurple-light">
              <Cpu className="w-5 h-5 mr-1.5" />
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {stats.eligibleCount}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Eligible Schemes</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Matched for {student.fullName}</p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-gold/20 text-center">
            <div className="flex items-center justify-center mb-1 text-gold">
              <Award className="w-5 h-5 mr-1.5" />
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-gold">
                {stats.strongMatchCount}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Strong Matches</p>
            <p className="text-[10px] text-slate-400 mt-0.5">≥ 88% Match Confidence</p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center mb-1 text-emerald-400">
              <TrendingUp className="w-5 h-5 mr-1.5" />
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                ₹{(stats.totalEstimatedAid / 100000).toFixed(1)}L+
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Estimated Aid Pool</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Annual potential grant</p>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-rose-500/20 text-center">
            <div className="flex items-center justify-center mb-1 text-rose-400">
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {stats.urgentDeadlinesCount}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Upcoming Deadlines</p>
            <p className="text-[10px] text-rose-400/90 font-medium mt-0.5">Closing within 30 days</p>
          </div>
        </div>

      </div>
    </section>
  );
}
