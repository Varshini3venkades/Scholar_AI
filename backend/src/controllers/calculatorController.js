import { calculatorService } from '../services/calculatorService.js';
import { scholarshipService } from '../services/scholarshipService.js';
import { profileService } from '../services/profileService.js';
import { evaluateEligibility } from '../services/matchingEngine.js';
import { DEFAULT_DEMO_PROFILE } from '../database/defaultData.js';

export async function calculateAidGap(req, res, next) {
  try {
    const userId = req.user?.id;
    let student = null;

    if (userId) {
      student = await profileService.getProfile(userId, req.user?.token);
    }
    if (!student) {
      student = DEFAULT_DEMO_PROFILE;
    }

    // Merge request body with student profile if custom values sent
    const financials = {
      tuition_fee: req.body.tuition_fee ?? req.body.tuitionFee ?? student.tuition_fee,
      living_expenses: req.body.living_expenses ?? req.body.livingExpenses ?? student.living_expenses,
      books_supplies: req.body.books_supplies ?? req.body.booksSupplies ?? student.books_supplies,
      family_contribution: req.body.family_contribution ?? req.body.familyContribution ?? student.family_contribution,
      existing_aid: req.body.existing_aid ?? req.body.existingAid ?? student.existing_aid
    };

    // Evaluate active scholarships against student to find eligible schemes for funding recommendations
    const activeScholarships = await scholarshipService.getActiveScholarships();
    const evaluated = activeScholarships.map(sch => {
      const eligibility = evaluateEligibility(student, sch);
      return {
        ...sch,
        eligibility
      };
    });

    const gapResult = calculatorService.calculateFundingGap(financials, evaluated);

    return res.status(200).json({
      success: true,
      data: gapResult
    });
  } catch (err) {
    next(err);
  }
}
