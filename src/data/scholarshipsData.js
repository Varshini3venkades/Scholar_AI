// Realistic scholarship programs with authentic criteria and official portal links
// Clearly labeled demo dataset with real-world institutional standards

export const SCHOLARSHIPS_DATA = [
  {
    id: "nsp-csss",
    name: "Central Sector Scheme of Scholarships for College and University Students",
    provider: "Ministry of Education, Government of India (National Scholarship Portal)",
    category: "Merit-cum-Need",
    amountPerYear: 20000,
    amountDisplay: "₹12,000 - ₹20,000 / year",
    duration: "Full Graduation & Post-Graduation",
    deadline: "2026-11-30",
    daysLeft: 50,
    officialUrl: "https://scholarships.gov.in",
    isGovernment: true,
    criteria: {
      minTenthMarks: 75,
      minTwelfthMarks: 80, // Top 20th percentile in board exam
      minCgpa: 6.5,
      maxFamilyIncome: 450000, // 4.5 LPA
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "BBA", "BCA", "Any"],
      allowedYears: ["1st Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Centrally sponsored scholarship to support meritorious students from low-income families in pursuing higher education. Covers graduate studies for up to 3-5 years.",
    requiredDocuments: [
      "12th Standard Passing Marksheet & Certificate",
      "Income Certificate issued by Revenue Authority (≤ ₹4.5 LPA)",
      "College Bonafide Student Certificate",
      "Aadhaar Card linked with Bank Account",
      "Student Bank Account Passbook Copy"
    ],
    officialNotice: "Applications processed strictly through National Scholarship Portal (NSP). DBT payment directly to student Aadhaar-seeded bank account.",
    tags: ["Govt of India", "NSP Portal", "Undergraduate", "Merit-cum-Need"]
  },
  {
    id: "reliance-ug",
    name: "Reliance Foundation Undergraduate Scholarship 2026",
    provider: "Reliance Foundation",
    category: "Merit-cum-Need",
    amountPerYear: 200000,
    amountDisplay: "Up to ₹2,00,000 total grant",
    duration: "Full Degree Duration",
    deadline: "2026-10-25",
    daysLeft: 14,
    officialUrl: "https://www.reliancefoundation.org/scholarships",
    isGovernment: false,
    criteria: {
      minTenthMarks: 60,
      minTwelfthMarks: 60,
      minCgpa: 7.0,
      maxFamilyIncome: 1500000, // Preference up to 2.5 LPA, max 15 LPA
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "BBA", "BCA", "Any"],
      allowedYears: ["1st Year", "2nd Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Prestigious philanthropic scholarship supporting 5,000 first-year undergraduate students across India with financial grants, mentorship, and leadership development.",
    requiredDocuments: [
      "Class 10th & 12th Board Marksheet",
      "Proof of College Admission / Bonafide Certificate",
      "Official Family Income Certificate or ITR",
      "Aadhaar Identity Card",
      "Online Aptitude Test Score Card (Conducted by Reliance)"
    ],
    officialNotice: "Selection includes an online aptitude test evaluating general mental ability and numerical reasoning.",
    tags: ["Prestigious", "Private Foundation", "Leadership Mentorship", "Pan-India"]
  },
  {
    id: "aicte-pragati",
    name: "AICTE Pragati Scholarship Scheme for Girl Students",
    provider: "All India Council for Technical Education (AICTE)",
    category: "Women in STEM",
    amountPerYear: 50000,
    amountDisplay: "₹50,000 / year",
    duration: "Entire course duration (up to 4 years)",
    deadline: "2026-11-15",
    daysLeft: 35,
    officialUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    isGovernment: true,
    criteria: {
      minTenthMarks: 60,
      minTwelfthMarks: 60,
      minCgpa: 6.0,
      maxFamilyIncome: 800000, // 8 LPA
      allowedDegrees: ["B.Tech", "B.E", "Diploma", "Engineering & Tech"],
      allowedYears: ["1st Year", "2nd Year"],
      eligibleStates: ["All India"],
      genderRequirement: "Female",
    },
    description: "Empowers young women pursuing higher technical and engineering education in AICTE approved institutions with ₹50,000 per annum towards college fee and equipment.",
    requiredDocuments: [
      "AICTE Approved Institute Admission Letter",
      "Family Income Certificate issued by Tehsildar (≤ ₹8 LPA)",
      "10th & 12th Standard Marksheets",
      "Bank Account details seeded with Aadhaar",
      "Caste / Category certificate (if applicable)"
    ],
    officialNotice: "Available to up to two girl children per family admitted to AICTE approved degree/diploma programs.",
    tags: ["Women in STEM", "AICTE", "Engineering Only", "Government Grant"]
  },
  {
    id: "tata-trusts-means",
    name: "Tata Trusts Means Grant for Higher Education",
    provider: "Sir Ratan Tata Trust & Allied Trusts",
    category: "Need-Based",
    amountPerYear: 60000,
    amountDisplay: "₹30,000 - ₹60,000 / year",
    duration: "Annual renewal based on performance",
    deadline: "2026-10-31",
    daysLeft: 20,
    officialUrl: "https://www.tatatrusts.org",
    isGovernment: false,
    criteria: {
      minTenthMarks: 60,
      minTwelfthMarks: 65,
      minCgpa: 6.5,
      maxFamilyIncome: 400000, // 4 LPA
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "M.Tech", "Any"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Need-based financial grant by Tata Trusts covering tuition fees for students with strong determination and limited economic means.",
    requiredDocuments: [
      "Current Academic Year College Fee Receipt",
      "Previous Semester / Year Marksheet (Minimum 60% or 6.5 CGPA)",
      "Income Proof of All Earning Family Members",
      "Statement of Financial Need / Essay",
      "College ID Card & Bonafide Letter"
    ],
    officialNotice: "Direct reimbursement of college tuition fees. Trust conducts telephone interview for shortlisted candidates.",
    tags: ["Tata Trusts", "Tuition Grant", "All Years Eligible", "Need-Based"]
  },
  {
    id: "hdfc-badhte-kadam",
    name: "HDFC Bank Parivartan's ECSS & Badhte Kadam Scholarship",
    provider: "HDFC Bank CSR / Buddy4Study",
    category: "Need-Based",
    amountPerYear: 75000,
    amountDisplay: "Up to ₹75,000 / year",
    duration: "One-time annual grant with re-application",
    deadline: "2026-11-20",
    daysLeft: 40,
    officialUrl: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
    isGovernment: false,
    criteria: {
      minTenthMarks: 55,
      minTwelfthMarks: 55,
      minCgpa: 6.0,
      maxFamilyIncome: 250000, // 2.5 LPA
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "BBA", "Diploma", "Any"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Supports students facing severe economic distress or sudden financial crisis to prevent dropouts from professional and general graduation courses.",
    requiredDocuments: [
      "Previous Year Marksheet (Minimum 55%)",
      "Government-issued Identity Proof (Aadhaar / Voter ID)",
      "Income Certificate / BPL Card / Salary Slip",
      "Current Year Admission Proof & Fee Structure",
      "Bank Account details of student"
    ],
    officialNotice: "Special consideration for students who have faced bereavement of earning parent or critical medical crisis.",
    tags: ["HDFC CSR", "Crisis Relief", "Low Income", "Broad Eligibility"]
  },
  {
    id: "ongc-merit",
    name: "ONGC Foundation Scholarship for Meritorious Students",
    provider: "Oil and Natural Gas Corporation (ONGC)",
    category: "Merit-cum-Need",
    amountPerYear: 48000,
    amountDisplay: "₹48,000 / year (₹4,000 / month)",
    duration: "Full 4-Year Engineering / MBBS / MBA Course",
    deadline: "2026-12-15",
    daysLeft: 65,
    officialUrl: "https://www.ongcscholar.org",
    isGovernment: true,
    criteria: {
      minTenthMarks: 65,
      minTwelfthMarks: 60,
      minCgpa: 6.5,
      maxFamilyIncome: 200000, // 2 LPA
      allowedDegrees: ["B.Tech", "B.E", "MBBS", "MBA", "M.Tech"],
      allowedYears: ["1st Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "PSU scholarship initiative by ONGC to support 2,000 exceptional first-year students pursuing professional technical courses nationwide.",
    requiredDocuments: [
      "10th and 12th Standard Passing Certificates",
      "Caste / Category Certificate (if applying under SC/ST/OBC quota)",
      "Income Certificate from Competent Revenue Authority",
      "College Admission Bonafide with College Seal",
      "Bank Account Proof linked to PAN/Aadhaar"
    ],
    officialNotice: "Disbursed in two half-yearly installments directly to the recipient's bank account subject to maintaining minimum 60% marks.",
    tags: ["PSU Scholarship", "Engineering & Medical", "Monthly Stipend", "Govt Enterprise"]
  },
  {
    id: "mahindra-talent",
    name: "KC Mahindra All India Talent Scholarship for Polytechnic & Diploma",
    provider: "K. C. Mahindra Education Trust",
    category: "Engineering & Tech",
    amountPerYear: 30000,
    amountDisplay: "₹10,000 / year (Up to 3 Years)",
    duration: "3 Years of Polytechnic Diploma",
    deadline: "2026-10-18",
    daysLeft: 7,
    officialUrl: "https://www.kcmet.org/what-we-do-scholarships-all-india-talent.aspx",
    isGovernment: false,
    criteria: {
      minTenthMarks: 65,
      minTwelfthMarks: 60,
      minCgpa: 6.0,
      maxFamilyIncome: 350000,
      allowedDegrees: ["Diploma", "B.Tech", "Engineering & Tech"],
      allowedYears: ["1st Year", "2nd Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Established in 1995 to encourage students from disadvantaged backgrounds to acquire technical and vocational skills through diploma courses.",
    requiredDocuments: [
      "10th Marksheet (Minimum 65% aggregate)",
      "Proof of Admission in Polytechnic / Engineering Institute",
      "Family Income Certificate",
      "Character Recommendation letter from School Principal",
      "Bank Account details"
    ],
    officialNotice: "Shortlisted applicants are invited for an in-person / virtual interview by senior Mahindra executives.",
    tags: ["Vocational & Diploma", "Mahindra Trust", "Expiring Soon", "Skill Development"]
  },
  {
    id: "sitaram-jindal",
    name: "Sitaram Jindal Foundation Educational Scholarship",
    provider: "Sitaram Jindal Foundation",
    category: "Merit-Based",
    amountPerYear: 24000,
    amountDisplay: "₹12,000 - ₹24,000 / year",
    duration: "Yearly renewal",
    deadline: "2026-12-31",
    daysLeft: 81,
    officialUrl: "https://www.sitaramjindalfoundation.org/scholarships.php",
    isGovernment: false,
    criteria: {
      minTenthMarks: 70,
      minTwelfthMarks: 70,
      minCgpa: 7.0,
      maxFamilyIncome: 400000,
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "Diploma", "Any"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Assists deserving and underprivileged students across various degree disciplines throughout India to ensure no talent goes uneducated.",
    requiredDocuments: [
      "SSLC/HSC / 10th & 12th Marks Card",
      "Previous Semester Marksheet",
      "Income Certificate (Not older than 3 years)",
      "Bonafide Certificate from College with Principal signature",
      "Hostel Warden Certificate (if living in hostel)"
    ],
    officialNotice: "Offline application forms can also be downloaded and submitted directly to Jindal Foundation Bangalore.",
    tags: ["All Disciplines", "Pan-India", "Flexible Criteria", "Private Trust"]
  },
  {
    id: "post-matric-sc-st",
    name: "National Post-Matric Scholarship Scheme for SC/ST/OBC Students",
    provider: "Ministry of Social Justice & Empowerment, Govt of India",
    category: "Minority / Reserved",
    amountPerYear: 120000,
    amountDisplay: "100% Tuition Waiver + Maintenance Allowance",
    duration: "Entire Degree Duration",
    deadline: "2026-11-25",
    daysLeft: 45,
    officialUrl: "https://scholarships.gov.in",
    isGovernment: true,
    criteria: {
      minTenthMarks: 50,
      minTwelfthMarks: 50,
      minCgpa: 5.0,
      maxFamilyIncome: 250000, // 2.5 LPA
      allowedDegrees: ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "MBA", "Diploma", "Any"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      eligibleStates: ["All India"],
      genderRequirement: "All",
    },
    description: "Centrally sponsored scheme providing comprehensive financial assistance to SC/ST/OBC students to pursue post-secondary or post-matriculation stages.",
    requiredDocuments: [
      "Valid Caste / Community Certificate issued by Tahsildar",
      "Family Income Certificate (≤ ₹2.5 LPA)",
      "10th & 12th Standard Passing Certificate",
      "College Fee Structure & Admission Receipt",
      "Aadhaar card linked bank account"
    ],
    officialNotice: "Tuition fees are credited directly to college institution, while monthly maintenance stipend is transferred to student's bank account.",
    tags: ["Full Tuition Support", "Govt Scheme", "Social Justice", "NSP Portal"]
  },
  {
    id: "adobe-women-tech",
    name: "Adobe Research Women-in-Technology Scholarship",
    provider: "Adobe Research India & Global",
    category: "Women in STEM",
    amountPerYear: 350000,
    amountDisplay: "₹3,50,000 + Internship Opportunity",
    duration: "One-time scholarship & Mentorship",
    deadline: "2026-11-05",
    daysLeft: 25,
    officialUrl: "https://research.adobe.com/scholarship/",
    isGovernment: false,
    criteria: {
      minTenthMarks: 75,
      minTwelfthMarks: 75,
      minCgpa: 8.0,
      maxFamilyIncome: 3000000, // Tech merit driven, high ceiling
      allowedDegrees: ["B.Tech", "B.E", "B.Sc", "Engineering & Tech"],
      allowedYears: ["2nd Year", "3rd Year"],
      eligibleStates: ["All India"],
      genderRequirement: "Female",
    },
    description: "Recognizes outstanding undergraduate female students in Computer Science and Engineering to encourage diversity in AI and computing technologies.",
    requiredDocuments: [
      "Resume / CV detailing coding projects and hackathon participations",
      "Academic Transcripts (College CGPA ≥ 8.0)",
      "Three Short Essay responses on tech vision and research interests",
      "One Letter of Recommendation from professor / department head"
    ],
    officialNotice: "Recipients also receive an interview opportunity for a summer internship at Adobe India labs.",
    tags: ["High Value Grant", "Internship Included", "Tech Giants", "Women in STEM"]
  }
];

export const CATEGORIES_LIST = [
  "All",
  "Merit-Based",
  "Need-Based",
  "Merit-cum-Need",
  "Women in STEM",
  "Engineering & Tech",
  "Minority / Reserved"
];

export const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal"
];

export const DEGREE_OPTIONS = [
  "B.Tech / B.E (Engineering)",
  "B.Sc (Computer Science / Pure Sciences)",
  "B.Com (Commerce & Finance)",
  "B.A (Arts & Humanities)",
  "MBBS / Medical Sciences",
  "BBA / Management",
  "Polytechnic / Diploma",
  "M.Tech / Post-Graduate"
];

export const STUDY_YEAR_OPTIONS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year"
];
