import React from 'react';
import { 
  Target, 
  Calculator, 
  ExternalLink, 
  CheckSquare, 
  Sparkles,
  Search,
  FileText
} from 'lucide-react';

export function FeatureCards({ onNavigate }) {
  const features = [
    {
      icon: Target,
      title: "Transparent AI Match Engine",
      color: "from-neonPurple to-indigo-600",
      borderColor: "hover:border-neonPurple",
      highlight: "Dual Criteria Algorithm",
      description: "Evaluates exact 10th & 12th marks percentages, college CGPA, annual family income, state, and discipline against authentic eligibility rules.",
      actionText: "View Matched Schemes",
      tab: "scholarships"
    },
    {
      icon: Calculator,
      title: "Financial Aid Gap Analyzer",
      color: "from-amber-400 to-gold",
      borderColor: "hover:border-gold",
      highlight: "Net Deficit Calculation",
      description: "Itemizes tuition fees, living expenses, and academic materials against family contribution to calculate the net shortfall and recommend funding bundles.",
      actionText: "Open Aid Calculator",
      tab: "calculator"
    },
    {
      icon: ExternalLink,
      title: "Direct Official Portals",
      color: "from-cyan-400 to-blue-600",
      borderColor: "hover:border-cyberCyan-light",
      highlight: "Zero Hallucinated Links",
      description: "Connects students directly to verified government portals (NSP, AICTE) and audited philanthropic trusts (Tata Trusts, Reliance, HDFC).",
      actionText: "Browse Direct Links",
      tab: "scholarships"
    },
    {
      icon: CheckSquare,
      title: "Smart Application & Document Tracker",
      color: "from-emerald-400 to-teal-600",
      borderColor: "hover:border-emerald-400",
      highlight: "Checklist Pipeline",
      description: "Tracks active submissions across 5 distinct lifecycle stages and organizes mandatory documentation (Income certificate, Marksheets, Bonafide).",
      actionText: "Track Applications",
      tab: "tracker"
    }
  ];

  return (
    <section className="py-8 sm:py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonPurple/15 text-neonPurple-light text-xs font-semibold border border-neonPurple/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Core AI Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
          Engineered for Accuracy & Transparency
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto mt-1">
          Eliminate ambiguity in scholarship discovery with structured eligibility verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div
              key={index}
              onClick={() => onNavigate(feat.tab)}
              className={`glass-card p-6 rounded-2xl flex flex-col justify-between cursor-pointer group transition-all duration-300 ${feat.borderColor}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <span className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {feat.highlight}
                </span>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-gold transition-colors">
                  {feat.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-neonPurple-light group-hover:text-gold transition-colors">
                <span>{feat.actionText}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
