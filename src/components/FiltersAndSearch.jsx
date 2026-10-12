import React from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/scholarshipsData';

export function FiltersAndSearch({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy, 
  showOnlyEligible, 
  setShowOnlyEligible,
  totalResults,
  onResetFilters
}) {
  const isFiltered = searchQuery !== "" || selectedCategory !== "All" || !showOnlyEligible || sortBy !== "matchScore";

  return (
    <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-4">
      
      {/* Top Search Bar & Sort Row */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship name, provider (e.g. NSP, Reliance, Tata, AICTE)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-navy-800/90 border border-white/10 focus:border-neonPurple text-white text-xs sm:text-sm placeholder-slate-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-navy-800 border border-white/10 w-full md:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-2"
            >
              <option value="matchScore" className="bg-navy-900 text-white">AI Match % (Highest)</option>
              <option value="deadline" className="bg-navy-900 text-white">Deadline (Closing Soonest)</option>
              <option value="amount" className="bg-navy-900 text-white">Grant Amount (Highest)</option>
            </select>
          </div>

          {/* Only Eligible Toggle */}
          <button
            onClick={() => setShowOnlyEligible(!showOnlyEligible)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap ${
              showOnlyEligible
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-navy-800 text-slate-400 border-white/10 hover:text-white'
            }`}
            title="Filter out schemes where current marks or income do not meet thresholds"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{showOnlyEligible ? 'Only Eligible' : 'Show All'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-neonPurple text-white shadow-glow-purple border border-neonPurple-light/40'
                  : 'bg-navy-800 text-slate-300 hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400 flex-shrink-0">
          <span>Found <strong className="text-white">{totalResults}</strong> schemes</span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-[11px] text-neonPurple-light hover:text-gold transition-colors font-semibold underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
