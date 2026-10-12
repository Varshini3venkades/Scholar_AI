export class CalculatorService {
  /**
   * Calculate education cost, existing support, and net funding gap
   */
  calculateFundingGap(financialData = {}, matchedScholarships = []) {
    const tuition = Number(financialData.tuition_fee ?? financialData.tuitionFee ?? 0);
    const living = Number(financialData.living_expenses ?? financialData.livingExpenses ?? 0);
    const supplies = Number(financialData.books_supplies ?? financialData.booksSupplies ?? 0);

    const family = Number(financialData.family_contribution ?? financialData.familyContribution ?? 0);
    const existingAid = Number(financialData.existing_aid ?? financialData.existingAid ?? 0);

    const totalCost = Math.max(0, tuition + living + supplies);
    const existingSupport = Math.max(0, family + existingAid);
    const fundingGap = Math.max(0, totalCost - existingSupport);

    const fundedPercentage = totalCost > 0
      ? Math.min(100, Math.round((existingSupport / totalCost) * 100))
      : 100;

    // Filter only eligible schemes and sort by award amount
    const eligibleSchemes = (matchedScholarships || [])
      .filter(s => s.eligibility?.isEligible || s.isEligible)
      .sort((a, b) => (b.amount_per_year || 0) - (a.amount_per_year || 0));

    let coveredAmount = 0;
    const recommendedPackage = [];

    for (const sch of eligibleSchemes) {
      if (coveredAmount < fundingGap) {
        recommendedPackage.push({
          id: sch.id,
          name: sch.name,
          provider: sch.provider,
          amount_per_year: sch.amount_per_year,
          matchScore: sch.eligibility?.matchScore || sch.matchScore || 85,
          official_url: sch.official_url
        });
        coveredAmount += Number(sch.amount_per_year || 0);
      }
    }

    const remainingDeficit = Math.max(0, fundingGap - coveredAmount);

    return {
      breakdown: {
        tuition_fee: tuition,
        living_expenses: living,
        books_supplies: supplies,
        total_education_cost: totalCost
      },
      support: {
        family_contribution: family,
        existing_aid: existingAid,
        total_existing_support: existingSupport
      },
      gap_analysis: {
        funding_gap: fundingGap,
        coverage_percentage: fundedPercentage,
        status: fundingGap === 0 ? 'fully_funded' : fundedPercentage >= 60 ? 'moderate_gap' : 'critical_gap',
        is_fully_covered_by_family: existingSupport >= totalCost
      },
      recommendations: {
        recommended_scholarships: recommendedPackage,
        total_potential_bridge_aid: coveredAmount,
        remaining_unfunded_deficit: remainingDeficit,
        can_bridge_entire_gap: coveredAmount >= fundingGap && fundingGap > 0
      }
    };
  }
}

export const calculatorService = new CalculatorService();
