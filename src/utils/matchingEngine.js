// Transparent AI Match Score and Explainability Engine
// Calculates clear eligibility verdicts, percentage scores, and point-by-point rationales

export function evaluateScholarshipMatch(student, scholarship) {
  const criteria = scholarship.criteria;
  const reasons = [];
  const flags = [];
  let isEligible = true;
  let ineligibilityReason = "";

  const income = Number(student.annualIncome) || 0;
  const tenth = Number(student.tenthMarks) || 0;
  const twelfth = Number(student.twelfthMarks) || 0;
  const cgpa = Number(student.cgpa) || 0;
  const degree = (student.degreeShort || student.degree || "").toLowerCase();
  const year = student.yearOfStudy || "1st Year";
  const gender = student.gender || "All";

  // 1. GENDER CHECK
  if (criteria.genderRequirement && criteria.genderRequirement !== "All") {
    if (criteria.genderRequirement.toLowerCase() !== gender.toLowerCase()) {
      isEligible = false;
      ineligibilityReason = `Reserved exclusively for ${criteria.genderRequirement} applicants in this category.`;
      flags.push({
        type: "fail",
        text: `Gender requirement not met (${criteria.genderRequirement} only)`
      });
    } else {
      reasons.push({
        type: "pass",
        title: "Gender Eligibility",
        text: `Qualifies for ${criteria.genderRequirement} empowerment quota (+15 pts)`
      });
    }
  }

  // 2. INCOME THRESHOLD CHECK
  if (criteria.maxFamilyIncome) {
    if (income > criteria.maxFamilyIncome) {
      isEligible = false;
      const excess = (income - criteria.maxFamilyIncome).toLocaleString('en-IN');
      ineligibilityReason = ineligibilityReason || `Annual family income (₹${income.toLocaleString('en-IN')}) exceeds scheme ceiling of ₹${criteria.maxFamilyIncome.toLocaleString('en-IN')} by ₹${excess}.`;
      flags.push({
        type: "fail",
        text: `Income exceeds ₹${(criteria.maxFamilyIncome / 100000).toFixed(1)} LPA ceiling by ₹${excess}`
      });
    } else {
      const margin = (criteria.maxFamilyIncome - income) / criteria.maxFamilyIncome;
      const incomeBonus = margin > 0.4 ? "High economic priority" : "Within admissible limit";
      reasons.push({
        type: "pass",
        title: "Family Income Compliance",
        text: `Income ₹${(income / 100000).toFixed(2)} LPA is well within the ₹${(criteria.maxFamilyIncome / 100000).toFixed(1)} LPA maximum (${incomeBonus})`
      });
    }
  }

  // 3. DEGREE AND ACADEMIC STREAM CHECK
  const isAnyDegree = criteria.allowedDegrees.includes("Any");
  const degreeMatches = isAnyDegree || criteria.allowedDegrees.some(deg => {
    const dLower = deg.toLowerCase();
    return degree.includes(dLower) || (dLower.includes("engineering") && (degree.includes("b.tech") || degree.includes("b.e")));
  });

  if (!degreeMatches) {
    isEligible = false;
    ineligibilityReason = ineligibilityReason || `Current degree (${student.degree}) does not match scheme target streams (${criteria.allowedDegrees.join(", ")}).`;
    flags.push({
      type: "fail",
      text: `Course not eligible (Target: ${criteria.allowedDegrees.join(", ")})`
    });
  } else {
    reasons.push({
      type: "pass",
      title: "Course Alignment",
      text: `Degree (${student.degreeShort || "Current Degree"}) matches permitted disciplines`
    });
  }

  // 4. YEAR OF STUDY CHECK
  const isAnyYear = criteria.allowedYears.includes("Any");
  const yearMatches = isAnyYear || criteria.allowedYears.includes(year);
  if (!yearMatches) {
    isEligible = false;
    ineligibilityReason = ineligibilityReason || `Scholarship only accepts applications for ${criteria.allowedYears.join(", ")}, but current year is ${year}.`;
    flags.push({
      type: "fail",
      text: `Year mismatch: Eligible only for ${criteria.allowedYears.join(", ")}`
    });
  } else {
    reasons.push({
      type: "pass",
      title: "Current Year Level",
      text: `Student is in ${year}, aligning with admission eligibility`
    });
  }

  // 5. 10th & 12th BOARD MARKS CHECK
  if (tenth < criteria.minTenthMarks) {
    isEligible = false;
    ineligibilityReason = ineligibilityReason || `10th standard percentage (${tenth}%) is below the minimum prerequisite of ${criteria.minTenthMarks}%.`;
    flags.push({
      type: "fail",
      text: `10th Marks (${tenth}%) below required ${criteria.minTenthMarks}%`
    });
  } else {
    reasons.push({
      type: "pass",
      title: "10th Standard Metric",
      text: `Score of ${tenth}% meets/exceeds baseline of ${criteria.minTenthMarks}%`
    });
  }

  if (twelfth < criteria.minTwelfthMarks) {
    isEligible = false;
    ineligibilityReason = ineligibilityReason || `12th standard percentage (${twelfth}%) is below minimum required ${criteria.minTwelfthMarks}%.`;
    flags.push({
      type: "fail",
      text: `12th Marks (${twelfth}%) below required ${criteria.minTwelfthMarks}%`
    });
  } else {
    const surplus = (twelfth - criteria.minTwelfthMarks).toFixed(1);
    reasons.push({
      type: "pass",
      title: "12th Standard Excellence",
      text: `Score of ${twelfth}% exceeds prerequisite ${criteria.minTwelfthMarks}% by +${surplus}%`
    });
  }

  // 6. COLLEGE CGPA CHECK
  if (cgpa < criteria.minCgpa) {
    isEligible = false;
    ineligibilityReason = ineligibilityReason || `College CGPA (${cgpa.toFixed(1)}) is lower than mandatory cutoff of ${criteria.minCgpa.toFixed(1)}.`;
    flags.push({
      type: "fail",
      text: `CGPA ${cgpa.toFixed(1)} below required ${criteria.minCgpa.toFixed(1)}`
    });
  } else {
    reasons.push({
      type: "pass",
      title: "Higher Education CGPA",
      text: `Current CGPA of ${cgpa.toFixed(2)}/10.0 fulfills academic criterion (Cutoff: ${criteria.minCgpa.toFixed(1)})`
    });
  }

  // CALCULATE MATCH PERCENTAGE SCORE
  let matchScore = 0;
  if (!isEligible) {
    // Partial potential score for comparison, capped at 45%
    let partial = 0;
    if (twelfth >= criteria.minTwelfthMarks) partial += 15;
    if (cgpa >= criteria.minCgpa) partial += 15;
    if (tenth >= criteria.minTenthMarks) partial += 10;
    matchScore = Math.min(45, partial);
  } else {
    // Base score for meeting all core gates: 60%
    let base = 60;

    // Academic merit booster (up to 20 pts)
    const twelfthSurplus = Math.max(0, (twelfth - criteria.minTwelfthMarks) / (100 - criteria.minTwelfthMarks));
    const cgpaSurplus = Math.max(0, (cgpa - criteria.minCgpa) / (10 - criteria.minCgpa));
    const meritBoost = (twelfthSurplus * 10) + (cgpaSurplus * 10);

    // Financial need priority booster (up to 12 pts)
    let needBoost = 0;
    if (criteria.maxFamilyIncome) {
      const incomeRatio = Math.max(0, 1 - (income / criteria.maxFamilyIncome));
      needBoost = incomeRatio * 12;
    } else {
      needBoost = 8;
    }

    // Stream and Year alignment booster (up to 8 pts)
    const streamBoost = (degreeMatches && yearMatches) ? 8 : 4;

    matchScore = Math.min(98, Math.round(base + meritBoost + needBoost + streamBoost));
  }

  // STATUS LABEL & COLOR BADGE
  let statusBadge = {
    label: "Not Eligible",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    glow: "shadow-none",
    tag: "Ineligible"
  };

  if (isEligible) {
    if (matchScore >= 90) {
      statusBadge = {
        label: "Strong Match",
        color: "bg-neonPurple/20 text-purple-200 border-neonPurple/50",
        glow: "shadow-glow-purple",
        tag: "Top Priority"
      };
    } else if (matchScore >= 75) {
      statusBadge = {
        label: "High Match",
        color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        glow: "shadow-emeraldGlow",
        tag: "Eligible"
      };
    } else {
      statusBadge = {
        label: "Moderate Match",
        color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        glow: "shadow-glow-gold",
        tag: "Eligible"
      };
    }
  }

  return {
    isEligible,
    matchScore,
    statusBadge,
    ineligibilityReason,
    reasons,
    flags
  };
}

export function computeStudentDashboardStats(student, scholarships) {
  let eligibleCount = 0;
  let strongMatchCount = 0;
  let urgentDeadlinesCount = 0;
  let totalEstimatedAid = 0;

  const evaluatedList = scholarships.map(sch => {
    const evaluation = evaluateScholarshipMatch(student, sch);
    if (evaluation.isEligible) {
      eligibleCount++;
      if (evaluation.matchScore >= 88) {
        strongMatchCount++;
      }
      if (sch.daysLeft <= 30) {
        urgentDeadlinesCount++;
      }
      totalEstimatedAid += sch.amountPerYear || 0;
    }
    return {
      ...sch,
      evaluation
    };
  });

  return {
    eligibleCount,
    strongMatchCount,
    urgentDeadlinesCount,
    totalEstimatedAid,
    evaluatedList
  };
}
