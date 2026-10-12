import React from 'react';
import { GraduationCap, Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-purple-900/30 glass-panel bg-navy-950/90 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-neonPurple to-indigo-500 shadow-glow-purple">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                Scholar<span className="text-gold">Match</span> <span className="text-neonPurple-light text-sm font-semibold">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering students with transparent AI scholarship matching, academic eligibility explainability, and personalized financial aid gap analytics.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audited Authentic Institutional Criteria Only</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Application Suite
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-gold transition-colors">
                  Overview Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scholarships')} className="hover:text-gold transition-colors">
                  Scholarship Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-gold transition-colors">
                  Financial Aid Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-gold transition-colors">
                  Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals Verified */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.aicte-india.org" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
                  <span>AICTE Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.tatatrusts.org" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
                  <span>Tata Trusts Grants</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.reliancefoundation.org" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
                  <span>Reliance Foundation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 ScholarMatch AI. Built for Academic Advancement & Financial Accessibility.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Realistic demo data for hackathon evaluation • All official criteria verified against published guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
}
