import { scholarshipService } from '../services/scholarshipService.js';
import { profileService } from '../services/profileService.js';
import { evaluateEligibility } from '../services/matchingEngine.js';
import { DEFAULT_DEMO_PROFILE } from '../database/defaultData.js';

export async function getStudentMatches(req, res, next) {
  try {
    const userId = req.user?.id;
    let student = null;

    // 1. If student profile is explicitly sent in request body (POST /matches), evaluate that
    if (req.body && Object.keys(req.body).length > 0) {
      student = req.body;
    } else {
      // Otherwise fetch from database
      student = await profileService.getProfile(userId, req.user?.token);
      if (!student) {
        student = DEFAULT_DEMO_PROFILE;
      }
    }

    // 2. Fetch all active, non-expired scholarships
    const scholarships = await scholarshipService.getActiveScholarships();

    // 3. Filter query options (status filter: 'all', 'eligible', 'potentially_eligible', 'ineligible')
    const statusFilter = req.query.status || 'all';
    const minScore = req.query.minScore ? Number(req.query.minScore) : 0;

    // 4. Run eligibility evaluation on each scholarship
    const evaluated = scholarships.map(sch => {
      const eligibility = evaluateEligibility(student, sch);
      return {
        ...sch,
        eligibility
      };
    });

    // 5. Apply filters
    let filtered = evaluated;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.eligibility.status === statusFilter);
    }
    if (minScore > 0) {
      filtered = filtered.filter(item => item.eligibility.matchScore >= minScore);
    }

    // 6. Sort by matchScore descending
    filtered.sort((a, b) => b.eligibility.matchScore - a.eligibility.matchScore);

    // Summary counts
    const eligibleCount = evaluated.filter(e => e.eligibility.status === 'eligible').length;
    const potentiallyEligibleCount = evaluated.filter(e => e.eligibility.status === 'potentially_eligible').length;
    const ineligibleCount = evaluated.filter(e => e.eligibility.status === 'ineligible').length;

    return res.status(200).json({
      success: true,
      summary: {
        totalEvaluated: evaluated.length,
        eligibleCount,
        potentiallyEligibleCount,
        ineligibleCount,
        strongMatchesCount: evaluated.filter(e => e.eligibility.status === 'eligible' && e.eligibility.matchScore >= 85).length
      },
      studentSummary: {
        name: student.full_name || student.fullName || student.name,
        tenth_marks: student.tenth_marks ?? student.tenthMarks,
        twelfth_marks: student.twelfth_marks ?? student.twelfthMarks,
        cgpa: student.cgpa,
        annual_income: student.annual_income ?? student.annualIncome,
        degree: student.degree,
        study_year: student.study_year ?? student.yearOfStudy,
        state: student.state
      },
      data: filtered
    });
  } catch (err) {
    next(err);
  }
}
