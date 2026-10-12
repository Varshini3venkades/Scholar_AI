import React from 'react';
import { 
  Calendar, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Building2,
  ChevronRight,
  BookmarkPlus,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';

export function ScholarshipCard({ 
  scholarship, 
  onSelectDetails, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const { evaluation } = scholarship;
  const isEligible = evaluation?.isEligible;
  const matchScore = evaluation?.matchScore || 0;
  const statusBadge = evaluation?.statusBadge;

  // Determine progress bar stroke color based on match
  let strokeColor = "#8655FF"; // Neon purple
  let textColor = "text-neonPurple-light";
  if (!isEligible) {
    strokeColor = "#F43F5E";
    textColor = "text-rose-400";
  } else if (matchScore >= 90) {
    strokeColor = "#FFD34E"; // Gold
    textColor = "text-gold";
  } else if (matchScore >= 75) {
    strokeColor = "#10B981"; // Emerald
    textColor = "text-emerald-400";
  }

  return (
    <div className={`glass-card p-5 sm:p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
      isEligible 
        ? matchScore >= 90 
          ? 'border-gold/30 hover:border-gold/70 hover:shadow-glow-gold' 
          : 'border-neonPurple/30 hover:border-neonPurple/70 hover:shadow-glow-purple'
        : 'border-white/10 opacity-75 hover:opacity-100 hover:border-rose-500/40'
    }`}>
      
      <div>
        {/* Top Header Row: Category, Tag & Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-navy-800 text-slate-300 border border-white/10">
              {scholarship.category}
            </span>

            {scholarship.isGovernment ? (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Govt Scheme
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Philanthropic
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(scholarship.id);
            }}
            className={`p-2 rounded-xl transition-all border ${
              isBookmarked
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5 hover:border-white/20'
            }`}
            title={isBookmarked ? "Tracked in Application Manager" : "Add to Application Tracker"}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          </button>
        </div>

        {/* Scholarship Title & Provider */}
        <div className="mb-4">
          <h3 
            onClick={() => onSelectDetails(scholarship)}
            className="text-base sm:text-lg font-bold font-heading text-white hover:text-gold cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {scholarship.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>By {scholarship.provider}</span>
          </p>
        </div>

        {/* Match Percentage & Status Highlight */}
        <div className="p-3.5 rounded-2xl bg-navy-850/80 border border-white/5 mb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${textColor}`} />
              <span className="text-xs font-bold text-slate-200">
                AI Match Score
              </span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusBadge?.color || ''}`}>
              {statusBadge?.label || "Status"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden relative border border-white/5">
              <div 
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${isEligible ? matchScore : 20}%`,
                  backgroundColor: strokeColor,
                  boxShadow: `0 0 10px ${strokeColor}`
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">
                {isEligible ? "Evaluation Criteria Met" : "Eligibility Criteria Unmet"}
              </span>
              <span className={`font-extrabold ${textColor}`}>
                {isEligible ? `${matchScore}%` : "Ineligible"}
              </span>
            </div>
          </div>

          {/* Explanation Snippet */}
          {isEligible ? (
            <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-slate-300">
              <p className="line-clamp-1 flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span>{evaluation.reasons[0]?.text || "All prerequisites verified."}</span>
              </p>
            </div>
          ) : (
            <div className="mt-2.5 pt-2 border-t border-rose-500/20 text-[11px] text-rose-300">
              <p className="line-clamp-2 flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{evaluation.ineligibilityReason}</span>
              </p>
            </div>
          )}
        </div>

        {/* Financial Amount & Deadline Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-left">
          <div className="p-3 rounded-xl bg-navy-900/90 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Scholarship Grant
            </span>
            <span className="text-sm sm:text-base font-extrabold text-gold block truncate mt-0.5">
              {scholarship.amountDisplay}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/90 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Deadline
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              <span className={`text-xs font-bold ${
                scholarship.daysLeft <= 20 ? 'text-rose-400' : 'text-slate-200'
              }`}>
                {scholarship.daysLeft} days left
              </span>
            </div>
          </div>
        </div>

        {/* Key Prerequisites Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] text-slate-300">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
            12th: &ge; {scholarship.criteria.minTwelfthMarks}%
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
            CGPA: &ge; {scholarship.criteria.minCgpa}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
            Max Income: ₹{(scholarship.criteria.maxFamilyIncome / 100000).toFixed(1)}L
          </span>
        </div>

        {/* Documents count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <FileText className="w-3.5 h-3.5 text-neonPurple-light" />
          <span>{scholarship.requiredDocuments.length} mandatory documents required</span>
        </div>

      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => onSelectDetails(scholarship)}
          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-navy-800 hover:bg-neonPurple/20 border border-neonPurple/40 hover:border-neonPurple transition-all flex items-center justify-center gap-1.5"
        >
          <span>AI Explanation</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={scholarship.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0"
          title="Direct link to verified official application portal"
        >
          <span>Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-gold" />
        </a>
      </div>

    </div>
  );
}
