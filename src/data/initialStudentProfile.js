export const DEFAULT_STUDENT_PROFILE = {
  fullName: "Ananya Sharma",
  tenthMarks: 88.5,
  twelfthMarks: 91.2,
  cgpa: 8.7,
  degree: "B.Tech / B.E (Engineering)",
  degreeShort: "B.Tech",
  yearOfStudy: "1st Year",
  annualIncome: 320000, // ₹3,20,000 / year
  state: "Maharashtra",
  category: "All",
  gender: "Female",
  // Financial aid details
  tuitionFee: 150000,
  livingExpenses: 70000,
  booksSupplies: 20000,
  familyContribution: 90000,
  existingAid: 20000
};

export const DEMO_PRESETS = [
  {
    id: "preset-1",
    label: "⭐ Ananya (High Achiever - B.Tech 1st Year)",
    description: "91.2% in 12th, 8.7 CGPA, ₹3.2 LPA income, Female. Matches Reliance, Pragati, NSP & Adobe.",
    profile: {
      fullName: "Ananya Sharma",
      tenthMarks: 88.5,
      twelfthMarks: 91.2,
      cgpa: 8.7,
      degree: "B.Tech / B.E (Engineering)",
      degreeShort: "B.Tech",
      yearOfStudy: "1st Year",
      annualIncome: 320000,
      state: "Maharashtra",
      category: "Women in STEM",
      gender: "Female",
      tuitionFee: 160000,
      livingExpenses: 80000,
      booksSupplies: 25000,
      familyContribution: 100000,
      existingAid: 25000
    }
  },
  {
    id: "preset-2",
    label: "💼 Rahul (Need-Based - B.Sc 2nd Year)",
    description: "72% in 12th, 7.1 CGPA, ₹1.8 LPA income. Matches HDFC Badhte Kadam, Tata Trusts & Jindal.",
    profile: {
      fullName: "Rahul Verma",
      tenthMarks: 76.0,
      twelfthMarks: 72.4,
      cgpa: 7.1,
      degree: "B.Sc (Computer Science / Pure Sciences)",
      degreeShort: "B.Sc",
      yearOfStudy: "2nd Year",
      annualIncome: 180000,
      state: "Uttar Pradesh",
      category: "Need-Based",
      gender: "Male",
      tuitionFee: 65000,
      livingExpenses: 45000,
      booksSupplies: 15000,
      familyContribution: 30000,
      existingAid: 0
    }
  },
  {
    id: "preset-3",
    label: "⚡ Siddharth (Diploma / Polytechnic)",
    description: "78% in 10th, 6.8 CGPA, ₹2.2 LPA income. Matches Mahindra All India Talent & NSP.",
    profile: {
      fullName: "Siddharth Patil",
      tenthMarks: 78.0,
      twelfthMarks: 68.0,
      cgpa: 6.8,
      degree: "Polytechnic / Diploma",
      degreeShort: "Diploma",
      yearOfStudy: "1st Year",
      annualIncome: 220000,
      state: "Karnataka",
      category: "Engineering & Tech",
      gender: "Male",
      tuitionFee: 45000,
      livingExpenses: 30000,
      booksSupplies: 12000,
      familyContribution: 25000,
      existingAid: 5000
    }
  }
];
