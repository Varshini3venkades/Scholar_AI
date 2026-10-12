/**
 * ScholarMatch AI - Transparent Scholarship Eligibility & Matching Engine
 * 
 * Rules:
 * 1. Only evaluate criteria that the scholarship actually specifies.
 * 2. Handle missing student information as 'unknown' rather than automatic failure.
 * 3. Return 'eligible', 'potentially_eligible', or 'ineligible' status.
 * 4. Transparent match score normalized strictly across applicable criteria.
 * 5. Return explicit reasons for each match, unmet requirement, and unknown field.
 */

export function evaluateEligibility(student = {}, scholarship = {}) {
  const matchedCriteria = [];
  const unmetCriteria = [];
  const unknownCriteria = [];
  const applicableCriteria = [];

  let isDisqualified = false;

  // Normalize student properties (support both snake_case and camelCase)
  const studentTenth = student.tenth_marks ?? student.tenthMarks ?? null;
  const studentTwelfth = student.twelfth_marks ?? student.twelfthMarks ?? null;
  const studentCgpa = student.cgpa ?? null;
  const studentIncome = student.annual_income ?? student.annualIncome ?? null;
  const studentGender = student.gender ?? null;
  const studentDegree = (student.degree_short || student.degreeShort || student.degree || '').toLowerCase();
  const studentYear = student.study_year || student.yearOfStudy || '';
  const studentState = student.state || '';

  // -------------------------------------------------------------
  // 1. 10th Standard Marks Check (Only if required by scholarship)
  // -------------------------------------------------------------
  const minTenth = scholarship.min_tenth_marks ?? scholarship.criteria?.minTenthMarks ?? null;
  if (minTenth !== null && minTenth !== undefined) {
    applicableCriteria.push('tenth_marks');
    if (studentTenth === null || studentTenth === undefined || isNaN(studentTenth)) {
      unknownCriteria.push({
        criterion: 'tenth_marks',
        label: '10th Standard Marks',
        reason: `Scholarship requires minimum ${minTenth}% in 10th, but student 10th score is not provided.`
      });
    } else if (Number(studentTenth) < Number(minTenth)) {
      isDisqualified = true;
      unmetCriteria.push({
        criterion: 'tenth_marks',
        label: '10th Standard Marks',
        required: `>= ${minTenth}%`,
        studentValue: `${studentTenth}%`,
        reason: `10th marks (${studentTenth}%) is below minimum requirement of ${minTenth}%.`
      });
    } else {
      matchedCriteria.push({
        criterion: 'tenth_marks',
        label: '10th Standard Marks',
        reason: `10th score of ${studentTenth}% fulfills requirement (Cutoff: ${minTenth}%).`,
        scoreContribution: 15
      });
    }
  }

  // -------------------------------------------------------------
  // 2. 12th Standard Marks Check (Only if required by scholarship)
  // -------------------------------------------------------------
  const minTwelfth = scholarship.min_twelfth_marks ?? scholarship.criteria?.minTwelfthMarks ?? null;
  if (minTwelfth !== null && minTwelfth !== undefined) {
    applicableCriteria.push('twelfth_marks');
    if (studentTwelfth === null || studentTwelfth === undefined || isNaN(studentTwelfth)) {
      unknownCriteria.push({
        criterion: 'twelfth_marks',
        label: '12th Standard Marks',
        reason: `Scholarship requires minimum ${minTwelfth}% in 12th, but student 12th score is not provided.`
      });
    } else if (Number(studentTwelfth) < Number(minTwelfth)) {
      isDisqualified = true;
      unmetCriteria.push({
        criterion: 'twelfth_marks',
        label: '12th Standard Marks',
        required: `>= ${minTwelfth}%`,
        studentValue: `${studentTwelfth}%`,
        reason: `12th marks (${studentTwelfth}%) is below required threshold of ${minTwelfth}%.`
      });
    } else {
      const surplus = (Number(studentTwelfth) - Number(minTwelfth)).toFixed(1);
      matchedCriteria.push({
        criterion: 'twelfth_marks',
        label: '12th Standard Marks',
        reason: `12th marks (${studentTwelfth}%) surpasses threshold (${minTwelfth}%) by +${surplus}%.`,
        scoreContribution: 25
      });
    }
  }

  // -------------------------------------------------------------
  // 3. College CGPA Check (Only if required by scholarship)
  // -------------------------------------------------------------
  const minCgpa = scholarship.min_cgpa ?? scholarship.criteria?.minCgpa ?? null;
  if (minCgpa !== null && minCgpa !== undefined) {
    applicableCriteria.push('cgpa');
    if (studentCgpa === null || studentCgpa === undefined || isNaN(studentCgpa)) {
      unknownCriteria.push({
        criterion: 'cgpa',
        label: 'College CGPA',
        reason: `Scholarship requires minimum CGPA ${minCgpa}/10, but college CGPA is not yet available.`
      });
    } else if (Number(studentCgpa) < Number(minCgpa)) {
      isDisqualified = true;
      unmetCriteria.push({
        criterion: 'cgpa',
        label: 'College CGPA',
        required: `>= ${minCgpa}`,
        studentValue: `${studentCgpa}`,
        reason: `College CGPA (${studentCgpa}) is below required cutoff of ${minCgpa}.`
      });
    } else {
      matchedCriteria.push({
        criterion: 'cgpa',
        label: 'College CGPA',
        reason: `CGPA ${studentCgpa}/10.0 meets requirement of ${minCgpa}.`,
        scoreContribution: 25
      });
    }
  }

  // -------------------------------------------------------------
  // 4. Annual Family Income Check (Only if required)
  // -------------------------------------------------------------
  const maxIncome = scholarship.max_family_income ?? scholarship.criteria?.maxFamilyIncome ?? null;
  if (maxIncome !== null && maxIncome !== undefined) {
    applicableCriteria.push('family_income');
    if (studentIncome === null || studentIncome === undefined || isNaN(studentIncome)) {
      unknownCriteria.push({
        criterion: 'family_income',
        label: 'Annual Family Income',
        reason: `Scholarship requires family income ≤ ₹${(maxIncome / 100000).toFixed(1)} LPA, but income is not provided.`
      });
    } else if (Number(studentIncome) > Number(maxIncome)) {
      isDisqualified = true;
      const excess = (Number(studentIncome) - Number(maxIncome)).toLocaleString('en-IN');
      unmetCriteria.push({
        criterion: 'family_income',
        label: 'Annual Family Income',
        required: `≤ ₹${(maxIncome / 100000).toFixed(1)} LPA`,
        studentValue: `₹${(Number(studentIncome) / 100000).toFixed(2)} LPA`,
        reason: `Annual family income (₹${Number(studentIncome).toLocaleString('en-IN')}) exceeds maximum limit by ₹${excess}.`
      });
    } else {
      matchedCriteria.push({
        criterion: 'family_income',
        label: 'Annual Family Income',
        reason: `Family income (₹${(Number(studentIncome) / 100000).toFixed(2)} LPA) is within eligible limit (≤ ₹${(maxIncome / 100000).toFixed(1)} LPA).`,
        scoreContribution: 20
      });
    }
  }

  // -------------------------------------------------------------
  // 5. Gender Requirement Check (e.g. Women in STEM)
  // -------------------------------------------------------------
  const genderReq = scholarship.gender_requirement ?? scholarship.criteria?.genderRequirement ?? 'All';
  if (genderReq && genderReq !== 'All') {
    applicableCriteria.push('gender');
    if (!studentGender || studentGender === 'All') {
      unknownCriteria.push({
        criterion: 'gender',
        label: 'Gender Verification',
        reason: `Scheme is reserved for ${genderReq} applicants; student gender not specified.`
      });
    } else if (genderReq.toLowerCase() !== studentGender.toLowerCase()) {
      isDisqualified = true;
      unmetCriteria.push({
        criterion: 'gender',
        label: 'Gender Requirement',
        required: genderReq,
        studentValue: studentGender,
        reason: `Scheme is exclusively reserved for ${genderReq} applicants.`
      });
    } else {
      matchedCriteria.push({
        criterion: 'gender',
        label: 'Gender Requirement',
        reason: `Qualifies for ${genderReq} scholarship initiative.`,
        scoreContribution: 10
      });
    }
  }

  // -------------------------------------------------------------
  // 6. Degree and Discipline Alignment
  // -------------------------------------------------------------
  const allowedDegrees = scholarship.allowed_degrees ?? scholarship.criteria?.allowedDegrees ?? ['Any'];
  if (allowedDegrees.length > 0 && !allowedDegrees.includes('Any')) {
    applicableCriteria.push('degree');
    if (!studentDegree) {
      unknownCriteria.push({
        criterion: 'degree',
        label: 'Eligible Degrees',
        reason: `Eligible for: ${allowedDegrees.join(', ')}. Degree not specified.`
      });
    } else {
      const isMatch = allowedDegrees.some(deg => {
        const d = deg.toLowerCase();
        return studentDegree.includes(d) || 
          (d.includes('engineering') && (studentDegree.includes('b.tech') || studentDegree.includes('b.e')));
      });

      if (!isMatch) {
        isDisqualified = true;
        unmetCriteria.push({
          criterion: 'degree',
          label: 'Degree Stream',
          required: allowedDegrees.join(', '),
          studentValue: student.degree || studentDegree,
          reason: `Student program does not match target disciplines (${allowedDegrees.join(', ')}).`
        });
      } else {
        matchedCriteria.push({
          criterion: 'degree',
          label: 'Degree Stream',
          reason: `Course aligns with permitted programs.`,
          scoreContribution: 15
        });
      }
    }
  }

  // -------------------------------------------------------------
  // 7. Year of Study Alignment
  // -------------------------------------------------------------
  const allowedYears = scholarship.allowed_years ?? scholarship.criteria?.allowedYears ?? ['Any'];
  if (allowedYears.length > 0 && !allowedYears.includes('Any')) {
    applicableCriteria.push('study_year');
    if (!studentYear) {
      unknownCriteria.push({
        criterion: 'study_year',
        label: 'Year of Study',
        reason: `Scheme targets: ${allowedYears.join(', ')}. Year not specified.`
      });
    } else {
      const isYearMatch = allowedYears.includes(studentYear);
      if (!isYearMatch) {
        isDisqualified = true;
        unmetCriteria.push({
          criterion: 'study_year',
          label: 'Year of Study',
          required: allowedYears.join(', '),
          studentValue: studentYear,
          reason: `Scheme only accepts ${allowedYears.join(', ')}, but student is currently in ${studentYear}.`
        });
      } else {
        matchedCriteria.push({
          criterion: 'study_year',
          label: 'Year of Study',
          reason: `Current year (${studentYear}) matches target cohort.`,
          scoreContribution: 10
        });
      }
    }
  }

  // -------------------------------------------------------------
  // 8. Domicile State / Region Check
  // -------------------------------------------------------------
  const eligibleStates = scholarship.eligible_states ?? scholarship.criteria?.eligibleStates ?? ['All India'];
  if (eligibleStates.length > 0 && !eligibleStates.includes('All India')) {
    applicableCriteria.push('state');
    if (!studentState) {
      unknownCriteria.push({
        criterion: 'state',
        label: 'Eligible State',
        reason: `State-specific scholarship for: ${eligibleStates.join(', ')}. State not specified.`
      });
    } else if (!eligibleStates.includes(studentState)) {
      isDisqualified = true;
      unmetCriteria.push({
        criterion: 'state',
        label: 'Domicile State',
        required: eligibleStates.join(', '),
        studentValue: studentState,
        reason: `Domicile state (${studentState}) not covered under regional quota.`
      });
    } else {
      matchedCriteria.push({
        criterion: 'state',
        label: 'Domicile State',
        reason: `State requirement (${studentState}) satisfied.`,
        scoreContribution: 10
      });
    }
  }

  // -------------------------------------------------------------
  // VERDICT STATUS DETERMINATION
  // -------------------------------------------------------------
  let status = 'eligible';
  if (isDisqualified) {
    status = 'ineligible';
  } else if (unknownCriteria.length > 0) {
    status = 'potentially_eligible';
  } else {
    status = 'eligible';
  }

  // -------------------------------------------------------------
  // TRANSPARENT MATCH SCORE CALCULATION
  // -------------------------------------------------------------
  let matchScore = 0;
  if (status === 'ineligible') {
    // Partial score indicating how close they were (capped at 40)
    const passedCount = matchedCriteria.length;
    const totalCount = applicableCriteria.length || 1;
    matchScore = Math.min(40, Math.round((passedCount / totalCount) * 40));
  } else if (status === 'potentially_eligible') {
    // Score based on verified criteria, pending unknown items (60 - 80)
    const passedWeight = matchedCriteria.reduce((sum, item) => sum + (item.scoreContribution || 15), 0);
    matchScore = Math.min(80, Math.max(55, Math.round(50 + (passedWeight * 0.3))));
  } else {
    // Base 70% for passing all hard gates + merit bonus based on scores
    let score = 70;

    // Merit surplus bonuses
    if (studentTwelfth && minTwelfth) {
      const surplus12 = Math.max(0, (Number(studentTwelfth) - Number(minTwelfth)) / (100 - Number(minTwelfth)));
      score += surplus12 * 14;
    }
    if (studentCgpa && minCgpa) {
      const surplusCgpa = Math.max(0, (Number(studentCgpa) - Number(minCgpa)) / (10 - Number(minCgpa)));
      score += surplusCgpa * 10;
    }
    if (studentIncome && maxIncome) {
      const incomeBonus = Math.max(0, 1 - (Number(studentIncome) / Number(maxIncome)));
      score += incomeBonus * 6;
    }

    matchScore = Math.min(99, Math.round(score));
  }

  return {
    status, // 'eligible' | 'potentially_eligible' | 'ineligible'
    isEligible: status === 'eligible',
    isPotentiallyEligible: status === 'potentially_eligible',
    matchScore,
    applicableCriteria,
    matchedCriteria,
    unmetCriteria,
    unknownCriteria,
    summaryReason: status === 'ineligible' 
      ? unmetCriteria[0]?.reason || 'Does not meet prerequisite criteria.'
      : status === 'potentially_eligible'
      ? `Potentially eligible; verification required for: ${unknownCriteria.map(u => u.label).join(', ')}.`
      : 'All mandatory academic and financial criteria satisfied.'
  };
}
