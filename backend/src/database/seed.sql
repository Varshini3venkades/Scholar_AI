-- =========================================================================
-- ScholarMatch AI - Supabase PostgreSQL Seed Data
-- =========================================================================

-- 1. Insert Initial Realistic Scholarships
INSERT INTO public.scholarships (
  id, name, provider, category, amount_per_year, amount_display, duration, 
  application_deadline, official_url, is_government, description, 
  min_tenth_marks, min_twelfth_marks, min_cgpa, max_family_income, 
  gender_requirement, allowed_degrees, allowed_years, eligible_states, 
  required_documents, official_notice, tags
) VALUES
(
  'nsp-csss',
  'Central Sector Scheme of Scholarships for College and University Students',
  'Ministry of Education, Government of India (National Scholarship Portal)',
  'Merit-cum-Need',
  20000.00,
  '₹12,000 - ₹20,000 / year',
  'Full Graduation & Post-Graduation',
  '2026-11-30',
  'https://scholarships.gov.in',
  true,
  'Centrally sponsored scholarship to support meritorious students from low-income families in pursuing higher education. Covers graduate studies for up to 3-5 years.',
  75.0, 80.0, 6.5, 450000.00,
  'All',
  ARRAY['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'MBBS', 'BBA', 'BCA', 'Any'],
  ARRAY['1st Year'],
  ARRAY['All India'],
  ARRAY[
    '12th Standard Passing Marksheet & Certificate',
    'Income Certificate issued by Revenue Authority (≤ ₹4.5 LPA)',
    'College Bonafide Student Certificate',
    'Aadhaar Card linked with Bank Account',
    'Student Bank Account Passbook Copy'
  ],
  'Applications processed strictly through National Scholarship Portal (NSP). DBT payment directly to student Aadhaar-seeded bank account.',
  ARRAY['Govt of India', 'NSP Portal', 'Undergraduate', 'Merit-cum-Need']
),
(
  'reliance-ug',
  'Reliance Foundation Undergraduate Scholarship 2026',
  'Reliance Foundation',
  'Merit-cum-Need',
  200000.00,
  'Up to ₹2,00,000 total grant',
  'Full Degree Duration',
  '2026-10-25',
  'https://www.reliancefoundation.org/scholarships',
  false,
  'Prestigious philanthropic scholarship supporting 5,000 first-year undergraduate students across India with financial grants, mentorship, and leadership development.',
  60.0, 60.0, 7.0, 1500000.00,
  'All',
  ARRAY['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'MBBS', 'BBA', 'BCA', 'Any'],
  ARRAY['1st Year', '2nd Year'],
  ARRAY['All India'],
  ARRAY[
    'Class 10th & 12th Board Marksheet',
    'Proof of College Admission / Bonafide Certificate',
    'Official Family Income Certificate or ITR',
    'Aadhaar Identity Card',
    'Online Aptitude Test Score Card'
  ],
  'Selection includes an online aptitude test evaluating general mental ability and numerical reasoning.',
  ARRAY['Prestigious', 'Private Foundation', 'Leadership Mentorship', 'Pan-India']
),
(
  'aicte-pragati',
  'AICTE Pragati Scholarship Scheme for Girl Students',
  'All India Council for Technical Education (AICTE)',
  'Women in STEM',
  50000.00,
  '₹50,000 / year',
  'Entire course duration (up to 4 years)',
  '2026-11-15',
  'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
  true,
  'Empowers young women pursuing higher technical and engineering education in AICTE approved institutions with ₹50,000 per annum towards college fee and equipment.',
  60.0, 60.0, 6.0, 800000.00,
  'Female',
  ARRAY['B.Tech', 'B.E', 'Diploma', 'Engineering & Tech'],
  ARRAY['1st Year', '2nd Year'],
  ARRAY['All India'],
  ARRAY[
    'AICTE Approved Institute Admission Letter',
    'Family Income Certificate issued by Tehsildar (≤ ₹8 LPA)',
    '10th & 12th Standard Marksheets',
    'Bank Account details seeded with Aadhaar',
    'Caste / Category certificate (if applicable)'
  ],
  'Available to up to two girl children per family admitted to AICTE approved degree/diploma programs.',
  ARRAY['Women in STEM', 'AICTE', 'Engineering Only', 'Government Grant']
),
(
  'tata-trusts-means',
  'Tata Trusts Means Grant for Higher Education',
  'Sir Ratan Tata Trust & Allied Trusts',
  'Need-Based',
  60000.00,
  '₹30,000 - ₹60,000 / year',
  'Annual renewal based on performance',
  '2026-10-31',
  'https://www.tatatrusts.org',
  false,
  'Need-based financial grant by Tata Trusts covering tuition fees for students with strong determination and limited economic means.',
  60.0, 65.0, 6.5, 400000.00,
  'All',
  ARRAY['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'MBBS', 'M.Tech', 'Any'],
  ARRAY['1st Year', '2nd Year', '3rd Year', '4th Year'],
  ARRAY['All India'],
  ARRAY[
    'Current Academic Year College Fee Receipt',
    'Previous Semester / Year Marksheet (Minimum 60% or 6.5 CGPA)',
    'Income Proof of All Earning Family Members',
    'Statement of Financial Need / Essay',
    'College ID Card & Bonafide Letter'
  ],
  'Direct reimbursement of college tuition fees. Trust conducts telephone interview for shortlisted candidates.',
  ARRAY['Tata Trusts', 'Tuition Grant', 'All Years Eligible', 'Need-Based']
),
(
  'hdfc-badhte-kadam',
  'HDFC Bank Parivartan ECSS & Badhte Kadam Scholarship',
  'HDFC Bank CSR / Buddy4Study',
  'Need-Based',
  75000.00,
  'Up to ₹75,000 / year',
  'One-time annual grant with re-application',
  '2026-11-20',
  'https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme',
  false,
  'Supports students facing severe economic distress or sudden financial crisis to prevent dropouts from professional and general graduation courses.',
  55.0, 55.0, 6.0, 250000.00,
  'All',
  ARRAY['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'MBBS', 'BBA', 'Diploma', 'Any'],
  ARRAY['1st Year', '2nd Year', '3rd Year', '4th Year'],
  ARRAY['All India'],
  ARRAY[
    'Previous Year Marksheet (Minimum 55%)',
    'Government-issued Identity Proof (Aadhaar / Voter ID)',
    'Income Certificate / BPL Card / Salary Slip',
    'Current Year Admission Proof & Fee Structure',
    'Bank Account details of student'
  ],
  'Special consideration for students who have faced bereavement of earning parent or critical medical crisis.',
  ARRAY['HDFC CSR', 'Crisis Relief', 'Low Income', 'Broad Eligibility']
),
(
  'ongc-merit',
  'ONGC Foundation Scholarship for Meritorious Students',
  'Oil and Natural Gas Corporation (ONGC)',
  'Merit-cum-Need',
  48000.00,
  '₹48,000 / year (₹4,000 / month)',
  'Full 4-Year Engineering / MBBS / MBA Course',
  '2026-12-15',
  'https://www.ongcscholar.org',
  true,
  'PSU scholarship initiative by ONGC to support 2,000 exceptional first-year students pursuing professional technical courses nationwide.',
  65.0, 60.0, 6.5, 200000.00,
  'All',
  ARRAY['B.Tech', 'B.E', 'MBBS', 'MBA', 'M.Tech'],
  ARRAY['1st Year'],
  ARRAY['All India'],
  ARRAY[
    '10th and 12th Standard Passing Certificates',
    'Caste / Category Certificate (if applying under SC/ST/OBC quota)',
    'Income Certificate from Competent Revenue Authority',
    'College Admission Bonafide with College Seal',
    'Bank Account Proof linked to PAN/Aadhaar'
  ],
  'Disbursed in two half-yearly installments directly to recipient bank account.',
  ARRAY['PSU Scholarship', 'Engineering & Medical', 'Monthly Stipend', 'Govt Enterprise']
),
(
  'mahindra-talent',
  'KC Mahindra All India Talent Scholarship for Polytechnic & Diploma',
  'K. C. Mahindra Education Trust',
  'Engineering & Tech',
  30000.00,
  '₹10,000 / year (Up to 3 Years)',
  '3 Years of Polytechnic Diploma',
  '2026-10-18',
  'https://www.kcmet.org/what-we-do-scholarships-all-india-talent.aspx',
  false,
  'Established in 1995 to encourage students from disadvantaged backgrounds to acquire technical and vocational skills through diploma courses.',
  65.0, 60.0, 6.0, 350000.00,
  'All',
  ARRAY['Diploma', 'B.Tech', 'Engineering & Tech'],
  ARRAY['1st Year', '2nd Year'],
  ARRAY['All India'],
  ARRAY[
    '10th Marksheet (Minimum 65% aggregate)',
    'Proof of Admission in Polytechnic / Engineering Institute',
    'Family Income Certificate',
    'Character Recommendation letter from School Principal',
    'Bank Account details'
  ],
  'Shortlisted applicants are invited for an interview by senior Mahindra executives.',
  ARRAY['Vocational & Diploma', 'Mahindra Trust', 'Expiring Soon', 'Skill Development']
),
(
  'sitaram-jindal',
  'Sitaram Jindal Foundation Educational Scholarship',
  'Sitaram Jindal Foundation',
  'Merit-Based',
  24000.00,
  '₹12,000 - ₹24,000 / year',
  'Yearly renewal',
  '2026-12-31',
  'https://www.sitaramjindalfoundation.org/scholarships.php',
  false,
  'Assists deserving and underprivileged students across various degree disciplines throughout India to ensure no talent goes uneducated.',
  70.0, 70.0, 7.0, 400000.00,
  'All',
  ARRAY['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'MBBS', 'Diploma', 'Any'],
  ARRAY['1st Year', '2nd Year', '3rd Year', '4th Year'],
  ARRAY['All India'],
  ARRAY[
    'SSLC/HSC / 10th & 12th Marks Card',
    'Previous Semester Marksheet',
    'Income Certificate (Not older than 3 years)',
    'Bonafide Certificate from College with Principal signature',
    'Hostel Warden Certificate (if living in hostel)'
  ],
  'Offline application forms can also be downloaded and submitted directly to Jindal Foundation Bangalore.',
  ARRAY['All Disciplines', 'Pan-India', 'Flexible Criteria', 'Private Trust']
),
(
  'adobe-women-tech',
  'Adobe Research Women-in-Technology Scholarship',
  'Adobe Research India & Global',
  'Women in STEM',
  350000.00,
  '₹3,50,000 + Internship Opportunity',
  'One-time scholarship & Mentorship',
  '2026-11-05',
  'https://research.adobe.com/scholarship/',
  false,
  'Recognizes outstanding undergraduate female students in Computer Science and Engineering to encourage diversity in AI and computing technologies.',
  NULL, 75.0, 8.0, 3000000.00, -- Note: null min_tenth_marks (does not evaluate 10th marks)
  'Female',
  ARRAY['B.Tech', 'B.E', 'B.Sc', 'Engineering & Tech'],
  ARRAY['2nd Year', '3rd Year'],
  ARRAY['All India'],
  ARRAY[
    'Resume / CV detailing coding projects and hackathon participations',
    'Academic Transcripts (College CGPA ≥ 8.0)',
    'Three Short Essay responses on tech vision and research interests',
    'One Letter of Recommendation from professor / department head'
  ],
  'Recipients also receive an interview opportunity for a summer internship at Adobe India labs.',
  ARRAY['High Value Grant', 'Internship Included', 'Tech Giants', 'Women in STEM']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  amount_per_year = EXCLUDED.amount_per_year,
  application_deadline = EXCLUDED.application_deadline,
  updated_at = NOW();

-- 2. Insert Demo Student Profile
INSERT INTO public.profiles (
  id, full_name, tenth_marks, twelfth_marks, cgpa, degree, degree_short, 
  study_year, annual_income, state, gender, category_preference,
  tuition_fee, living_expenses, books_supplies, family_contribution, existing_aid
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Ananya Sharma',
  88.50,
  91.20,
  8.70,
  'B.Tech / B.E (Engineering)',
  'B.Tech',
  '1st Year',
  320000.00,
  'Maharashtra',
  'Female',
  'Women in STEM',
  160000.00,
  80000.00,
  25000.00,
  100000.00,
  25000.00
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Demo Applications in Tracker
INSERT INTO public.applications (
  student_id, scholarship_id, status, document_checklist, notes, applied_date
) VALUES 
(
  'a0000000-0000-0000-0000-000000000001',
  'reliance-ug',
  'submitted',
  '{
    "Class 10th & 12th Board Marksheet": {"ready": true},
    "Proof of College Admission / Bonafide Certificate": {"ready": true},
    "Official Family Income Certificate or ITR": {"ready": true},
    "Aadhaar Identity Card": {"ready": true},
    "Online Aptitude Test Score Card": {"ready": true}
  }'::jsonb,
  'Submitted online aptitude exam on October 5th. Awaiting shortlist results.',
  '2026-10-05'
),
(
  'a0000000-0000-0000-0000-000000000001',
  'nsp-csss',
  'docs_ready',
  '{
    "12th Standard Passing Marksheet & Certificate": {"ready": true},
    "Income Certificate issued by Revenue Authority (≤ ₹4.5 LPA)": {"ready": true},
    "College Bonafide Student Certificate": {"ready": true},
    "Aadhaar Card linked with Bank Account": {"ready": true},
    "Student Bank Account Passbook Copy": {"ready": false}
  }'::jsonb,
  'Need to seed bank account with NPCI Aadhaar bridge at bank branch.',
  NULL
) ON CONFLICT (student_id, scholarship_id) DO NOTHING;
