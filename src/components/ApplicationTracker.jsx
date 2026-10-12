import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Clock, 
  CheckCircle, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Plus, 
  AlertCircle, 
  CheckSquare, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STATUS_STAGES = [
  { id: 'not_started', label: 'Not Started', color: 'bg-slate-700 text-slate-200' },
  { id: 'docs_ready', label: 'Docs Ready', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { id: 'submitted', label: 'Submitted', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { id: 'under_review', label: 'Under Review', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'awarded', label: 'Awarded 🎉', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' }
];

export function ApplicationTracker({ 
  bookmarkedIds, 
  onToggleBookmark, 
  allScholarships, 
  onSelectDetails,
  onNavigateToScholarships 
}) {
  // Local state for application status per scholarship
  const [statuses, setStatuses] = useState(() => {
    const initial = {};
    bookmarkedIds.forEach(id => {
      initial[id] = 'docs_ready';
    });
    return initial;
  });

  // Local state for document completion
  const [docProgress, setDocProgress] = useState({});

  const trackedList = allScholarships.filter(s => bookmarkedIds.includes(s.id));

  const handleStatusChange = (id, newStatus) => {
    setStatuses(prev => ({
      ...prev,
      [id]: newStatus
    }));

    if (newStatus === 'awarded') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const toggleDocumentCheck = (scholarshipId, docName) => {
    setDocProgress(prev => {
      const key = `${scholarshipId}_${docName}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonPurple/15 text-neonPurple-light text-xs font-semibold border border-neonPurple/30 mb-2">
            <BookmarkCheck className="w-3.5 h-3.5 text-gold" />
            <span>Scholarship Application Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Application Tracker & Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Monitor document readiness, upcoming deadlines, and application status stages in one unified dashboard.
          </p>
        </div>

        <button
          onClick={onNavigateToScholarships}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-neonPurple text-white text-xs font-bold hover:bg-neonPurple-light transition-all flex items-center gap-2 shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Add More Scholarships</span>
        </button>
      </div>

      {/* Tracker Content or Empty State */}
      {trackedList.length === 0 ? (
        <div className="glass-card p-10 rounded-3xl border border-white/10 text-center max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-navy-800 flex items-center justify-center text-slate-400 mx-auto mb-4 border border-white/5">
            <BookmarkCheck className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">
            No Scholarships Tracked Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
            You haven't bookmarked any scholarship applications yet. Head over to the Scholarships catalog to bookmark schemes and organize your document checklists.
          </p>
          <button
            onClick={onNavigateToScholarships}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neonPurple to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-glow-purple hover:scale-105 transition-all"
          >
            <span>Explore Recommended Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-navy-850 border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Submissions</span>
              <span className="text-2xl font-black text-white block mt-0.5">{trackedList.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-850 border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Submitted / In Review</span>
              <span className="text-2xl font-black text-neonPurple-light block mt-0.5">
                {trackedList.filter(s => ['submitted', 'under_review'].includes(statuses[s.id])).length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-850 border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Awarded Grants</span>
              <span className="text-2xl font-black text-emerald-400 block mt-0.5">
                {trackedList.filter(s => statuses[s.id] === 'awarded').length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-navy-850 border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Grant Value</span>
              <span className="text-2xl font-black text-gold block mt-0.5">
                ₹{(trackedList.reduce((acc, s) => acc + (s.amountPerYear || 0), 0) / 100000).toFixed(2)}L
              </span>
            </div>
          </div>

          {/* List of Applications */}
          <div className="space-y-4">
            {trackedList.map((sch) => {
              const currentStatus = statuses[sch.id] || 'not_started';
              const daysLeft = sch.daysLeft;

              return (
                <div
                  key={sch.id}
                  className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-neonPurple/50 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-navy-800 text-slate-300 border border-white/10">
                          {sch.category}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                          daysLeft <= 20 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-white/5 text-slate-300'
                        }`}>
                          <Clock className="w-3 h-3" /> Deadline: {sch.deadline} ({daysLeft} days)
                        </span>
                      </div>

                      <h4 
                        onClick={() => onSelectDetails(sch)}
                        className="text-base sm:text-lg font-bold font-heading text-white hover:text-gold cursor-pointer transition-colors"
                      >
                        {sch.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {sch.provider} • Grant: <strong className="text-gold">{sch.amountDisplay}</strong>
                      </p>
                    </div>

                    {/* Status Selector & Actions */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Status:</span>
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(sch.id, e.target.value)}
                          className="px-3 py-2 rounded-xl bg-navy-800 border border-neonPurple/40 text-xs font-bold text-white outline-none cursor-pointer"
                        >
                          {STATUS_STAGES.map(stage => (
                            <option key={stage.id} value={stage.id} className="bg-navy-900 text-white">
                              {stage.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <a
                        href={sch.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
                        title="Open Official Portal"
                      >
                        <ExternalLink className="w-4 h-4 text-gold" />
                      </a>

                      <button
                        onClick={() => onToggleBookmark(sch.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-all"
                        title="Remove from Tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Document Preparation Sub-Checklist */}
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Application Document Checklist:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {sch.requiredDocuments.map((doc, docIdx) => {
                        const isDone = !!docProgress[`${sch.id}_${doc}`];
                        return (
                          <div
                            key={docIdx}
                            onClick={() => toggleDocumentCheck(sch.id, doc)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-navy-950/60 border-white/5 text-slate-300 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                                isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500'
                              }`}>
                                {isDone && '✓'}
                              </div>
                              <span className={`truncate ${isDone ? 'line-through opacity-75' : ''}`}>
                                {doc}
                              </span>
                            </div>
                            <span className="text-[10px] ml-1 flex-shrink-0 text-slate-400 font-semibold">
                              {isDone ? 'Ready' : 'Pending'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* General Documentation Guidelines Card */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Pro-Tip for Indian Government & Trust Scholarships</span>
        </div>
        <p className="leading-relaxed">
          Ensure your bank account is seeded with Aadhaar for Direct Benefit Transfer (DBT). Most government schemes (NSP, AICTE) disburse funds directly via NPCI Aadhaar bridge. For private trusts (Tata Trusts, Reliance), obtain a physical Bonafide Certificate with your College Principal's official round seal and signature.
        </p>
      </div>

    </div>
  );
}
