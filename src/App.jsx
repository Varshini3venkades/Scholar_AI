import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { DashboardOverview } from './components/DashboardOverview';
import { ScholarshipCard } from './components/ScholarshipCard';
import { ScholarshipDetailsModal } from './components/ScholarshipDetailsModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { FinancialAidCalculator } from './components/FinancialAidCalculator';
import { ApplicationTracker } from './components/ApplicationTracker';
import { FiltersAndSearch } from './components/FiltersAndSearch';
import { Footer } from './components/Footer';

import { SCHOLARSHIPS_DATA } from './data/scholarshipsData';
import { DEFAULT_STUDENT_PROFILE } from './data/initialStudentProfile';
import { computeStudentDashboardStats } from './utils/matchingEngine';
import { Sparkles, Layers, Sliders, RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  // Current Student Profile State
  const [student, setStudent] = useState(DEFAULT_STUDENT_PROFILE);
  
  // Navigation State: 'dashboard' | 'scholarships' | 'calculator' | 'tracker'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  // Application Tracker Bookmarked IDs (Pre-populated with 2 for instant demo experience)
  const [bookmarkedIds, setBookmarkedIds] = useState(['reliance-ug', 'nsp-csss']);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('matchScore'); // 'matchScore' | 'deadline' | 'amount'
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);

  // AI Matching Scan State (Simulated live recalculation)
  const [isScanning, setIsScanning] = useState(false);

  // Dynamically evaluate all scholarships with Student Profile
  const dashboardStats = useMemo(() => {
    return computeStudentDashboardStats(student, SCHOLARSHIPS_DATA);
  }, [student]);

  // Filtered & Sorted Scholarships
  const filteredScholarships = useMemo(() => {
    let list = [...dashboardStats.evaluatedList];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter(s => s.category === selectedCategory);
    }

    // Filter by Eligibility
    if (showOnlyEligible) {
      list = list.filter(s => s.evaluation.isEligible);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'matchScore') {
        return (b.evaluation.matchScore || 0) - (a.evaluation.matchScore || 0);
      } else if (sortBy === 'deadline') {
        return (a.daysLeft || 0) - (b.daysLeft || 0);
      } else if (sortBy === 'amount') {
        return (b.amountPerYear || 0) - (a.amountPerYear || 0);
      }
      return 0;
    });

    return list;
  }, [dashboardStats.evaluatedList, searchQuery, selectedCategory, showOnlyEligible, sortBy]);

  // Bookmark Toggle
  const handleToggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Re-run AI scanning simulation with visual feedback
  const handleTriggerRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  // Update financial profile numbers
  const handleUpdateFinancials = (updatedFields) => {
    setStudent(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('matchScore');
    setShowOnlyEligible(false);
  };

  return (
    <div className="min-h-screen bg-[#050A20] text-slate-100 flex flex-col relative selection:bg-neonPurple selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        student={student} 
        onOpenProfile={() => setIsProfileModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        eligibleCount={dashboardStats.eligibleCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* Landing Hero (Always visible at top of Dashboard or accessible) */}
        {activeTab === 'dashboard' && (
          <>
            <HeroSection 
              student={student}
              onGetStarted={() => {
                setActiveTab('scholarships');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              stats={dashboardStats}
            />
            
            <FeatureCards onNavigate={(tab) => setActiveTab(tab)} />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                  <h3 className="text-xl font-bold font-heading text-white">
                    Live Eligibility Intelligence
                  </h3>
                </div>

                <button
                  onClick={handleTriggerRescan}
                  disabled={isScanning}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-all"
                  title="Re-run matching rules against current profile"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-neonPurple-light ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Recalculating...' : 'Refresh AI Scan'}</span>
                </button>
              </div>

              {/* Top Stats Overview */}
              <DashboardOverview 
                stats={dashboardStats}
                student={student}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onNavigateToScholarships={() => setActiveTab('scholarships')}
                onOpenAidCalculator={() => setActiveTab('calculator')}
              />

              {/* Quick Preview of Top 3 Matched Scholarships */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">
                      Top Matched Scholarships for You
                    </h3>
                    <p className="text-xs text-slate-400">
                      Evaluated against your 10th ({student.tenthMarks}%), 12th ({student.twelfthMarks}%), CGPA ({student.cgpa}), and family income.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('scholarships')}
                    className="text-xs font-bold text-neonPurple-light hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <span>View All {dashboardStats.evaluatedList.length}</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {dashboardStats.evaluatedList.slice(0, 3).map((sch) => (
                    <ScholarshipCard 
                      key={sch.id}
                      scholarship={sch}
                      onSelectDetails={(s) => setSelectedScholarship(s)}
                      isBookmarked={bookmarkedIds.includes(sch.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHOLARSHIPS DIRECTORY */}
          {activeTab === 'scholarships' && (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonPurple/15 text-neonPurple-light text-xs font-semibold border border-neonPurple/30 mb-2">
                  <Layers className="w-3.5 h-3.5 text-gold" />
                  <span>Scholarship Discovery Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Eligible & Recommended Scholarships
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Cross-referenced with your 10th marks, 12th marks, College CGPA, and ₹{(student.annualIncome / 100000).toFixed(1)} LPA family income.
                </p>
              </div>

              {/* Filters & Search Component */}
              <FiltersAndSearch 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showOnlyEligible={showOnlyEligible}
                setShowOnlyEligible={setShowOnlyEligible}
                totalResults={filteredScholarships.length}
                onResetFilters={resetFilters}
              />

              {/* Scholarships Grid or Empty State */}
              {filteredScholarships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredScholarships.map((sch) => (
                    <ScholarshipCard 
                      key={sch.id}
                      scholarship={sch}
                      onSelectDetails={(s) => setSelectedScholarship(s)}
                      isBookmarked={bookmarkedIds.includes(sch.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 rounded-3xl border border-white/10 text-center max-w-lg mx-auto my-12">
                  <AlertCircle className="w-12 h-12 text-gold mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">No Schemes Found</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    No scholarships match your active filter combination. Try resetting your search filters or toggling off "Only Eligible".
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-neonPurple text-white text-xs font-bold shadow-glow-purple"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FINANCIAL AID CALCULATOR */}
          {activeTab === 'calculator' && (
            <FinancialAidCalculator 
              student={student}
              onUpdateFinancials={handleUpdateFinancials}
              evaluatedScholarships={dashboardStats.evaluatedList}
              onSelectScholarship={(s) => setSelectedScholarship(s)}
            />
          )}

          {/* TAB 4: APPLICATION TRACKER & CHECKLIST */}
          {activeTab === 'tracker' && (
            <ApplicationTracker 
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              allScholarships={dashboardStats.evaluatedList}
              onSelectDetails={(s) => setSelectedScholarship(s)}
              onNavigateToScholarships={() => setActiveTab('scholarships')}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Student Profile Form Modal */}
      <StudentProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={student}
        onSaveProfile={(updated) => setStudent(updated)}
      />

      {/* Scholarship Details & Explainability Modal */}
      <ScholarshipDetailsModal 
        scholarship={selectedScholarship}
        student={student}
        onClose={() => setSelectedScholarship(null)}
        isBookmarked={selectedScholarship ? bookmarkedIds.includes(selectedScholarship.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

    </div>
  );
}
