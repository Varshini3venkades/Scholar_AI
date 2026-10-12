import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Building2, 
  BookmarkCheck, 
  BookmarkPlus,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ScholarshipDetailsModal({ 
  scholarship, 
  student, 
  onClose, 
  isBookmarked, 
  onToggleBookmark 
}) {
  if (!scholarship) return null;

  const { evaluation } = scholarship;
  const isEligible = evaluation?.isEligible;
  const matchScore = evaluation?.matchScore || 0;
  const criteria = scholarship.criteria;

  // Local checklist state for document readiness
  const [checkedDocs, setCheckedDocs] = useState({});

  const toggleDoc = (docIndex) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docIndex]: !prev[docIndex]
    }));
  };

  const handleApplyClick = () => {
    // Trigger confetti celebration on official application redirect
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleTrackerClick = () => {
    onToggleBookmark(scholarship.id);
    if (!isBookmarked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-neonPurple/40 shadow-glow-purple my-8 overflow-hidden bg-navy-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between bg-navy-850/90 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-navy-800 text-slate-300 border border-white/10">
                {scholarship.category}
              </span>

              {scholarship.isGovernment ? (
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Govt Scheme
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> Audited Foundation Grant
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {scholarship.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Administered by: <span className="font-semibold text-white">{scholarship.provider}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-navy-850 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Grant</span>
              <span className="text-base sm:text-lg font-black text-gold block mt-0.5">
                {scholarship.amountDisplay}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-navy-850 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 block mt-0.5 truncate">
                {scholarship.duration}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-navy-850 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs sm:text-sm font-bold text-rose-400">
                  {scholarship.deadline}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-navy-850 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match Score</span>
              <span className={`text-base sm:text-lg font-black block mt-0.5 ${
                isEligible ? 'text-neonPurple-light' : 'text-rose-400'
              }`}>
                {isEligible ? `${matchScore}%` : '0% (Ineligible)'}
              </span>
            </div>
          </div>

          {/* Transparent AI Explanation Panel */}
          <div className={`p-5 rounded-2xl border ${
            isEligible 
              ? 'bg-neonPurple/10 border-neonPurple/40 shadow-glow-purple' 
              : 'bg-rose-500/10 border-rose-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={`w-5 h-5 ${isEligible ? 'text-gold' : 'text-rose-400'}`} />
              <h3 className="text-base font-bold font-heading text-white">
                Transparent AI Eligibility Verdict & Explanation
              </h3>
            </div>

            {isEligible ? (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-200">
                  <span className="font-bold text-emerald-400">Verdict: Fully Eligible ({evaluation.statusBadge.label}).</span> Based on cross-referencing your academic records and household income against the scheme criteria:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/10">
                  {evaluation.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-navy-900/60 p-2.5 rounded-xl border border-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">{r.title}</span>
                        <span className="text-slate-300">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-rose-200">
                  <span className="font-bold text-rose-400">Verdict: Ineligible for this scheme.</span>
                </p>
                <div className="p-3 rounded-xl bg-navy-900/80 border border-rose-500/30 text-xs text-slate-200 flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-400 block mb-0.5">Primary Reason:</span>
                    <span>{evaluation.ineligibilityReason}</span>
                  </div>
                </div>

                {evaluation.flags?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Unmet Criteria:</span>
                    {evaluation.flags.map((flag, idx) => (
                      <div key={idx} className="text-xs text-rose-300 flex items-center gap-1.5 pl-2">
                        <span>•</span> <span>{flag.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Academic & Economic Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-gold" />
              Criteria vs Student Profile Comparison
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-navy-850 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Scheme Prerequisite</th>
                    <th className="p-3">Your Profile ({student.fullName})</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-navy-900/60">
                  <tr>
                    <td className="p-3 font-medium text-white">10th Standard Marks</td>
                    <td className="p-3">&ge; {criteria.minTenthMarks}%</td>
                    <td className="p-3 font-bold text-white">{student.tenthMarks}%</td>
                    <td className="p-3 text-right">
                      {student.tenthMarks >= criteria.minTenthMarks ? (
                        <span className="text-emerald-400 font-bold">✓ Satisfied</span>
                      ) : (
                        <span className="text-rose-400 font-bold">✗ Shortfall</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-white">12th Standard Marks</td>
                    <td className="p-3">&ge; {criteria.minTwelfthMarks}%</td>
                    <td className="p-3 font-bold text-white">{student.twelfthMarks}%</td>
                    <td className="p-3 text-right">
                      {student.twelfthMarks >= criteria.minTwelfthMarks ? (
                        <span className="text-emerald-400 font-bold">✓ Satisfied</span>
                      ) : (
                        <span className="text-rose-400 font-bold">✗ Shortfall</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-white">College CGPA</td>
                    <td className="p-3">&ge; {criteria.minCgpa.toFixed(1)} / 10</td>
                    <td className="p-3 font-bold text-gold">{student.cgpa} / 10</td>
                    <td className="p-3 text-right">
                      {student.cgpa >= criteria.minCgpa ? (
                        <span className="text-emerald-400 font-bold">✓ Satisfied</span>
                      ) : (
                        <span className="text-rose-400 font-bold">✗ Shortfall</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-white">Family Income Ceiling</td>
                    <td className="p-3">&le; ₹{(criteria.maxFamilyIncome / 100000).toFixed(1)} LPA</td>
                    <td className="p-3 font-bold text-white">₹{(student.annualIncome / 100000).toFixed(2)} LPA</td>
                    <td className="p-3 text-right">
                      {student.annualIncome <= criteria.maxFamilyIncome ? (
                        <span className="text-emerald-400 font-bold">✓ Satisfied</span>
                      ) : (
                        <span className="text-rose-400 font-bold">✗ Exceeds</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-white">Eligible Streams</td>
                    <td className="p-3 truncate max-w-xs">{criteria.allowedDegrees.join(", ")}</td>
                    <td className="p-3 font-bold text-white">{student.degreeShort || "Current"}</td>
                    <td className="p-3 text-right">
                      <span className="text-emerald-400 font-bold">✓ Match</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mandatory Documents Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neonPurple-light" />
                Required Document Preparation Checklist ({scholarship.requiredDocuments.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Tick items as you gather them
              </span>
            </div>

            <div className="space-y-2">
              {scholarship.requiredDocuments.map((doc, idx) => {
                const isDone = !!checkedDocs[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(idx)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-navy-850/80 border-white/5 text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500 bg-navy-900'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs ${isDone ? 'line-through opacity-80' : ''}`}>{doc}</span>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-navy-800 text-slate-400'
                    }`}>
                      {isDone ? 'Ready' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-4 rounded-2xl bg-navy-850 border border-white/10 text-xs text-slate-300">
            <p className="font-semibold text-white mb-1">Official Portal & Application Instructions:</p>
            <p className="leading-relaxed">{scholarship.officialNotice}</p>
            <p className="text-[11px] text-slate-400 mt-2">
              Note: ScholarMatch AI does not accept payments or direct applications. Always submit through the official portal URL verified below.
            </p>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-navy-850/90 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleTrackerClick}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              isBookmarked
                ? 'bg-gold/20 text-gold border-gold/40 hover:bg-gold/30'
                : 'bg-white/5 text-slate-200 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-gold" />
                <span>Tracking in Applications</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4" />
                <span>Add to My Application Tracker</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Close
            </button>

            <a
              href={scholarship.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-neonPurple-dark via-neonPurple to-indigo-600 hover:from-neonPurple hover:to-indigo-500 shadow-glow-purple border border-neonPurple-light/40 transition-all flex items-center gap-2"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4 text-gold" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
