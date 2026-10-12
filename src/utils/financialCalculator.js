// Financial Aid Calculator and Funding Gap Optimization Logic

export function calculateFinancialAid(student, eligibleScholarships = []) {
  const tuition = Number(student.tuitionFee) || 0;
  const living = Number(student.livingExpenses) || 0;
  const supplies = Number(student.booksSupplies) || 0;

  const familyContribution = Number(student.familyContribution) || 0;
  const existingAid = Number(student.existingAid) || 0;

  const totalCost = tuition + living + supplies;
  const existingSupport = familyContribution + existingAid;
  const fundingGap = Math.max(0, totalCost - existingSupport);

  const fundedPercentage = totalCost > 0 
    ? Math.min(100, Math.round((existingSupport / totalCost) * 100))
    : 100;

  // Find optimal scholarship combinations to bridge the gap
  // Sort eligible by amount descending and matchScore descending
  const sortedEligible = [...eligibleScholarships]
    .filter(s => s.evaluation && s.evaluation.isEligible)
    .sort((a, b) => (b.evaluation.matchScore || 0) - (a.evaluation.matchScore || 0));

  let coveredAmount = 0;
  const recommendedPackage = [];

  for (const sch of sortedEligible) {
    if (coveredAmount < fundingGap) {
      recommendedPackage.push(sch);
      coveredAmount += sch.amountPerYear;
    }
  }

  const remainingGapAfterScholarships = Math.max(0, fundingGap - coveredAmount);

  return {
    tuition,
    living,
    supplies,
    totalCost,
    familyContribution,
    existingAid,
    existingSupport,
    fundingGap,
    fundedPercentage,
    recommendedPackage,
    coveredAmount,
    remainingGapAfterScholarships,
    isFullyFundable: coveredAmount >= fundingGap && fundingGap > 0
  };
}
