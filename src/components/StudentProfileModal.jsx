import React, { useState } from 'react';
import { 
  X, 
  Check, 
  User, 
  Percent, 
  BookOpen, 
  DollarSign, 
  MapPin, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { INDIAN_STATES, CATEGORIES_LIST, DEGREE_OPTIONS, STUDY_YEAR_OPTIONS } from '../data/scholarshipsData';
import { DEMO_PRESETS } from '../data/initialStudentProfile';

export function StudentProfileModal({ 
  isOpen, 
  onClose, 
  currentProfile, 
  onSaveProfile 
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ ...currentProfile });
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter a valid student name";
    }

    const tenth = Number(formData.tenthMarks);
    if (isNaN(tenth) || tenth < 35 || tenth > 100) {
      errs.tenthMarks = "10th marks must be between 35% and 100%";
    }

    const twelfth = Number(formData.twelfthMarks);
    if (isNaN(twelfth) || twelfth < 35 || twelfth > 100) {
      errs.twelfthMarks = "12th marks must be between 35% and 100%";
    }

    const cgpa = Number(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      errs.cgpa = "CGPA must be between 0.0 and 10.0";
    }

    const income = Number(formData.annualIncome);
    if (isNaN(income) || income < 0) {
      errs.annualIncome = "Please enter valid annual family income";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleApplyPreset = (preset) => {
    setFormData({ ...preset.profile });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Derive degree short label
    let degreeShort = "B.Tech";
    if (formData.degree.includes("B.Sc")) degreeShort = "B.Sc";
    else if (formData.degree.includes("B.Com")) degreeShort = "B.Com";
    else if (formData.degree.includes("MBBS")) degreeShort = "MBBS";
    else if (formData.degree.includes("Diploma")) degreeShort = "Diploma";
    else if (formData.degree.includes("B.A")) degreeShort = "B.A";

    const updatedProfile = {
      ...formData,
      tenthMarks: parseFloat(formData.tenthMarks),
      twelfthMarks: parseFloat(formData.twelfthMarks),
      cgpa: parseFloat(formData.cgpa),
      annualIncome: parseInt(formData.annualIncome, 10),
      tuitionFee: parseInt(formData.tuitionFee || 150000, 10),
      livingExpenses: parseInt(formData.livingExpenses || 70000, 10),
      booksSupplies: parseInt(formData.booksSupplies || 20000, 10),
      familyContribution: parseInt(formData.familyContribution || 80000, 10),
      degreeShort
    };

    onSaveProfile(updatedProfile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-neonPurple/40 shadow-glow-purple my-8 overflow-hidden bg-navy-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-navy-850/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neonPurple to-indigo-600 flex items-center justify-center text-white shadow-glow-purple">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                Student Profile & Eligibility Criteria
              </h3>
              <p className="text-xs text-slate-400">
                Inputs directly feed into the transparent AI scholarship matching engine.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Presets Banner */}
        <div className="px-6 py-3.5 bg-navy-800/80 border-b border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Hackathon Quick Test Presets:
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (Click to instantly test matching behavior)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-left px-3 py-2 rounded-xl bg-navy-900/90 hover:bg-neonPurple/20 border border-white/10 hover:border-neonPurple-light/50 transition-all text-xs"
              >
                <div className="font-semibold text-white truncate">{preset.label}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Section 1: Basic & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-800/90 border ${
                  errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-neonPurple'
                } text-white text-sm outline-none transition-all`}
              />
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Gender <span className="text-slate-400 font-normal">(Used for Women-in-STEM schemes)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Female', 'Male', 'Other'].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleChange('gender', g)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      formData.gender === g
                        ? 'bg-neonPurple/30 border-neonPurple text-white shadow-glow-purple'
                        : 'bg-navy-800 border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Academic Scores (10th, 12th, CGPA) */}
          <div className="p-4 rounded-2xl bg-navy-850/70 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-neonPurple-light" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Academic Merit Criteria
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  10th Standard Marks (%) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="35"
                    max="100"
                    value={formData.tenthMarks}
                    onChange={(e) => handleChange('tenthMarks', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border ${
                      errors.tenthMarks ? 'border-rose-500' : 'border-white/10 focus:border-neonPurple'
                    } text-white text-sm outline-none`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">%</span>
                </div>
                {errors.tenthMarks && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.tenthMarks}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  12th Standard Marks (%) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="35"
                    max="100"
                    value={formData.twelfthMarks}
                    onChange={(e) => handleChange('twelfthMarks', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border ${
                      errors.twelfthMarks ? 'border-rose-500' : 'border-white/10 focus:border-neonPurple'
                    } text-white text-sm outline-none`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">%</span>
                </div>
                {errors.twelfthMarks && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.twelfthMarks}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  College CGPA (0 - 10) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => handleChange('cgpa', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border ${
                      errors.cgpa ? 'border-rose-500' : 'border-white/10 focus:border-neonPurple'
                    } text-white text-sm outline-none`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-gold font-bold">/10</span>
                </div>
                {errors.cgpa && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.cgpa}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Degree & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Current Degree / Program
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 focus:border-neonPurple text-white text-sm outline-none cursor-pointer"
              >
                {DEGREE_OPTIONS.map((deg) => (
                  <option key={deg} value={deg} className="bg-navy-900 text-white">
                    {deg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Current Year of Study
              </label>
              <select
                value={formData.yearOfStudy}
                onChange={(e) => handleChange('yearOfStudy', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 focus:border-neonPurple text-white text-sm outline-none cursor-pointer"
              >
                {STUDY_YEAR_OPTIONS.map((yr) => (
                  <option key={yr} value={yr} className="bg-navy-900 text-white">
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4: Income & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Annual Family Income (INR) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gold">₹</span>
                <input
                  type="number"
                  step="10000"
                  min="0"
                  value={formData.annualIncome}
                  onChange={(e) => handleChange('annualIncome', e.target.value)}
                  placeholder="300000"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-navy-800 border ${
                    errors.annualIncome ? 'border-rose-500' : 'border-white/10 focus:border-neonPurple'
                  } text-white text-sm outline-none`}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Equivalent to: ₹{(Number(formData.annualIncome || 0) / 100000).toFixed(2)} Lakhs per annum
              </p>
              {errors.annualIncome && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.annualIncome}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Domicile State / UT
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 focus:border-neonPurple text-white text-sm outline-none cursor-pointer"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st} className="bg-navy-900 text-white">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 5: Preferred Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Preferred Scholarship Category Filter
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 focus:border-neonPurple text-white text-sm outline-none cursor-pointer"
            >
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat} value={cat} className="bg-navy-900 text-white">
                  {cat === "All" ? "All Categories (Comprehensive Scan)" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-neonPurple to-indigo-600 hover:from-neonPurple-light hover:to-indigo-500 shadow-glow-purple border border-neonPurple-light/40 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Profile Updated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Update & Re-run AI Matching</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
