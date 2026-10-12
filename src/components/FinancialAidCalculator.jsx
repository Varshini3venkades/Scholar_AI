import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  ArrowRight,
  PieChart,
  Layers,
  HelpCircle
} from 'lucide-react';
import { calculateFinancialAid } from '../utils/financialCalculator';

export function FinancialAidCalculator({ 
  student, 
  onUpdateFinancials, 
  evaluatedScholarships,
  onSelectScholarship 
}) {
  const [tuition, setTuition] = useState(student.tuitionFee || 150000);
  const [living, setLiving] = useState(student.livingExpenses || 70000);
  const [supplies, setSupplies] = useState(student.booksSupplies || 20000);
  const [family, setFamily] = useState(student.familyContribution || 80000);
  const [aid, setAid] = useState(student.existingAid || 0);

  // Compute live calculations
  const tempProfile = {
    ...student,
    tuitionFee: tuition,
    livingExpenses: living,
    booksSupplies: supplies,
    familyContribution: family,
    existingAid: aid
  };

  const aidResult = calculateFinancialAid(tempProfile, evaluatedScholarships);

  const handleApplyChanges = () => {
    onUpdateFinancials({
      tuitionFee: tuition,
      livingExpenses: living,
      booksSupplies: supplies,
      familyContribution: family,
      existingAid: aid
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>AI Cost & Gap Analyzer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Financial Aid & Funding Gap Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Compute your true cost of attendance, family support capacity, and uncover the net funding gap.
          </p>
        </div>

        <button
          onClick={handleApplyChanges}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-neonPurple/20 hover:bg-neonPurple/30 text-neonPurple-light text-xs font-bold border border-neonPurple/40 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Save to Student Profile</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Inputs on Left, Visual Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Section 1: Estimated Education Costs */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              1. Estimated Education Expenses (Annual)
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">College Tuition & Examination Fees</span>
                  <span className="font-bold text-white">₹{tuition.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="400000"
                  step="5000"
                  value={tuition}
                  onChange={(e) => setTuition(Number(e.target.value))}
                  className="w-full accent-[#8655FF] h-1.5 bg-navy-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Hostel, Accommodation & Food</span>
                  <span className="font-bold text-white">₹{living.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={living}
                  onChange={(e) => setLiving(Number(e.target.value))}
                  className="w-full accent-[#8655FF] h-1.5 bg-navy-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Books, Laptop & Study Material</span>
                  <span className="font-bold text-white">₹{supplies.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="2000"
                  value={supplies}
                  onChange={(e) => setSupplies(Number(e.target.value))}
                  className="w-full accent-[#8655FF] h-1.5 bg-navy-950 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Total Annual Education Cost:</span>
                <span className="text-base font-extrabold text-white">₹{aidResult.totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Existing Financial Resources */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. Existing Support & Resources
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Family Contribution Capacity (Savings / Income)</span>
                  <span className="font-bold text-white">₹{family.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="5000"
                  value={family}
                  onChange={(e) => setFamily(Number(e.target.value))}
                  className="w-full accent-[#10B981] h-1.5 bg-navy-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Existing Institutional Waiver / External Grants</span>
                  <span className="font-bold text-white">₹{aid.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  step="5000"
                  value={aid}
                  onChange={(e) => setAid(Number(e.target.value))}
                  className="w-full accent-[#10B981] h-1.5 bg-navy-950 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Total Confirmed Support:</span>
                <span className="text-base font-extrabold text-emerald-400">₹{aidResult.existingSupport.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Analysis & Funding Gap Gauge (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Funding Gap Card */}
          <div className="glass-card p-6 rounded-3xl border border-gold/40 shadow-glow-gold relative overflow-hidden bg-gradient-to-b from-navy-850 to-navy-900">
            <span className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">
              Live Net Funding Gap
            </span>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-black font-heading text-white">
                ₹{aidResult.fundingGap.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300">
                / year
              </span>
            </div>

            {/* Visual Gauge */}
            <div className="space-y-1.5 my-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Coverage Index</span>
                <span className={aidResult.fundedPercentage >= 75 ? 'text-emerald-400' : 'text-gold'}>
                  {aidResult.fundedPercentage}% Funded
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-navy-950 overflow-hidden border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-gold to-neonPurple transition-all duration-500"
                  style={{ width: `${aidResult.fundedPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Self-Funded: ₹{aidResult.existingSupport.toLocaleString('en-IN')}</span>
                <span>Total Need: ₹{aidResult.totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {aidResult.fundingGap > 0 ? (
                <span>
                  You require an additional <strong className="text-gold">₹{aidResult.fundingGap.toLocaleString('en-IN')}</strong> in scholarship assistance to pursue education debt-free.
                </span>
              ) : (
                <span className="text-emerald-300 font-semibold">
                  Congratulations! Your current financial support completely covers all estimated academic costs.
                </span>
              )}
            </p>
          </div>

          {/* AI Recommended Scholarship Package to Bridge Gap */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-neonPurple/30">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-neonPurple-light" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                AI Recommended Funding Bridge
              </h4>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Scholarships algorithmically selected to bridge your ₹{aidResult.fundingGap.toLocaleString('en-IN')} gap:
            </p>

            {aidResult.recommendedPackage.length > 0 ? (
              <div className="space-y-2.5">
                {aidResult.recommendedPackage.map((sch) => (
                  <div
                    key={sch.id}
                    onClick={() => onSelectScholarship(sch)}
                    className="p-3 rounded-2xl bg-navy-950/80 border border-white/10 hover:border-neonPurple/60 cursor-pointer transition-all flex items-center justify-between gap-2 group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-gold transition-colors line-clamp-1">
                        {sch.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Match Score: <strong className="text-emerald-400">{sch.evaluation?.matchScore}%</strong>
                      </span>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-extrabold text-gold block">
                        +₹{sch.amountPerYear.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-neonPurple-light">Details →</span>
                    </div>
                  </div>
                ))}

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Bridge Potential:</span>
                  <span className="font-extrabold text-emerald-400">
                    ₹{aidResult.coveredAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {aidResult.remainingGapAfterScholarships > 0 ? (
                  <p className="text-[11px] text-amber-300 mt-1">
                    Remaining Unfunded Deficit: ₹{aidResult.remainingGapAfterScholarships.toLocaleString('en-IN')}
                  </p>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Selected schemes fully bridge your entire funding deficit!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-navy-900 text-center text-xs text-slate-400">
                No eligible scholarship selected or gap is zero. Update your criteria to scan for more matches.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
