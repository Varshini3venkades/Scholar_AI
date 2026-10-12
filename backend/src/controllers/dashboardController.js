import { scholarshipService } from '../services/scholarshipService.js';
import { profileService } from '../services/profileService.js';
import { evaluateEligibility } from '../services/matchingEngine.js';
import { DEFAULT_DEMO_PROFILE } from '../database/defaultData.js';

export async function getDashboardSummary(req, res, next) {
  try {
    const userId = req.user?.id;
    let student = await profileService.getProfile(userId, req.user?.token);
    if (!student) {
      student = DEFAULT_DEMO_PROFILE;
    }

    // 1. Fetch only active (non-expired) scholarships
    const rawScholarships = await scholarshipService.getActiveScholarships();

    // 2. Avoid duplicates: deduplicate by unique scholarship ID
    const seenIds = new Set();
    const scholarships = [];
    for (const sch of rawScholarships) {
      if (!seenIds.has(sch.id)) {
        seenIds.add(sch.id);
        scholarships.push(sch);
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let eligibleCount = 0;
    let strongMatchesCount = 0;
    let upcomingDeadlinesCount = 0;
    let estimatedAid = 0;

    const evaluatedList = [];
    const upcomingDeadlinesList = [];

    for (const sch of scholarships) {
      const evaluation = evaluateEligibility(student, sch);

      // Compute days remaining until deadline
      const deadlineDate = new Date(sch.application_deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      const diffTime = deadlineDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const enriched = {
        ...sch,
        daysLeft,
        evaluation
      };

      if (evaluation.isEligible) {
        eligibleCount++;
        estimatedAid += Number(sch.amount_per_year || 0);

        if (evaluation.matchScore >= 85) {
          strongMatchesCount++;
        }
      }

      // Check if deadline is within 30 days and not expired
      if (daysLeft >= 0 && daysLeft <= 30) {
        upcomingDeadlinesCount++;
        upcomingDeadlinesList.push({
          id: sch.id,
          name: sch.name,
          provider: sch.provider,
          amount_display: sch.amount_display,
          application_deadline: sch.application_deadline,
          daysLeft,
          isEligible: evaluation.isEligible,
          official_url: sch.official_url
        });
      }

      evaluatedList.push(enriched);
    }

    // Sort evaluated by matchScore descending
    evaluatedList.sort((a, b) => b.evaluation.matchScore - a.evaluation.matchScore);

    // Sort upcoming deadlines by days left ascending
    upcomingDeadlinesList.sort((a, b) => a.daysLeft - b.daysLeft);

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          eligible_scholarships_count: eligibleCount,
          strong_matches_count: strongMatchesCount,
          upcoming_deadlines_count: upcomingDeadlinesCount,
          estimated_financial_aid: estimatedAid,
          formatted_estimated_aid: `₹${(estimatedAid / 100000).toFixed(2)} Lakhs`,
          total_active_scanned: scholarships.length
        },
        student: {
          id: student.id,
          full_name: student.full_name || student.fullName,
          tenth_marks: student.tenth_marks,
          twelfth_marks: student.twelfth_marks,
          cgpa: student.cgpa,
          annual_income: student.annual_income,
          degree: student.degree,
          study_year: student.study_year,
          state: student.state
        },
        upcoming_deadlines: upcomingDeadlinesList,
        top_matched_scholarships: evaluatedList.slice(0, 3)
      }
    });
  } catch (err) {
    next(err);
  }
}
