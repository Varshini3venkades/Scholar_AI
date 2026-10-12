# ScholarMatch AI – Backend API Documentation

**Base URL**: `http://localhost:5000/api/v1`  
**Authentication**: Bearer Token (`Authorization: Bearer <supabase-jwt>`) or Development Header (`x-student-id: <uuid>`).

---

## 1. System Health Check

### `GET /api/v1/health`
Check API server status and PostgreSQL database connection via Supabase.

#### Sample Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-10-11T06:22:31.000Z",
  "service": "ScholarMatch AI Backend API",
  "version": "1.0.0",
  "database": {
    "connected": true,
    "mode": "supabase_live",
    "message": "Successfully connected to PostgreSQL via Supabase"
  }
}
```

---

## 2. Student Profile API

### `GET /api/v1/profile`
Retrieve the authenticated student's profile.

#### Headers:
- `Authorization: Bearer <token>` or `x-student-id: a0000000-0000-0000-0000-000000000001`

#### Sample Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "a0000000-0000-0000-0000-000000000001",
    "full_name": "Ananya Sharma",
    "tenth_marks": 88.5,
    "twelfth_marks": 91.2,
    "cgpa": 8.7,
    "degree": "B.Tech / B.E (Engineering)",
    "degree_short": "B.Tech",
    "study_year": "1st Year",
    "annual_income": 320000,
    "state": "Maharashtra",
    "gender": "Female",
    "category_preference": "Women in STEM",
    "tuition_fee": 160000,
    "living_expenses": 80000,
    "books_supplies": 25000,
    "family_contribution": 100000,
    "existing_aid": 25000
  }
}
```

---

### `POST /api/v1/profile` or `PUT /api/v1/profile`
Create or update student profile with validation.

#### Request Body:
```json
{
  "full_name": "Ananya Sharma",
  "tenth_marks": 88.5,
  "twelfth_marks": 91.2,
  "cgpa": 8.7,
  "degree": "B.Tech / B.E (Engineering)",
  "study_year": "1st Year",
  "annual_income": 320000,
  "state": "Maharashtra",
  "gender": "Female",
  "category_preference": "Women in STEM",
  "tuition_fee": 160000,
  "living_expenses": 80000,
  "books_supplies": 25000,
  "family_contribution": 100000,
  "existing_aid": 25000
}
```

#### Sample Response (200 OK):
```json
{
  "success": true,
  "message": "Student profile updated successfully",
  "data": {
    "id": "a0000000-0000-0000-0000-000000000001",
    "full_name": "Ananya Sharma",
    "cgpa": 8.7,
    "annual_income": 320000,
    "updated_at": "2026-10-11T06:22:31.000Z"
  }
}
```

---

## 3. Scholarship Management API

### `GET /api/v1/scholarships`
Retrieve filtered and paginated scholarships.

#### Query Parameters:
| Param | Type | Description |
|---|---|---|
| `search` | String | Keyword query matching name, provider, description, or tags |
| `category` | String | e.g. `Merit-cum-Need`, `Women in STEM`, `Need-Based` |
| `state` | String | Domicile state filter |
| `maxIncome` | Number | Maximum family income threshold |
| `isGovernment`| Boolean | `true` or `false` |
| `onlyActive` | Boolean | Exclude expired deadlines (`true`/`false`) |
| `page` | Integer | Default: `1` |
| `limit` | Integer | Default: `10` |
| `sortBy` | String | `application_deadline`, `amount_per_year`, `name` |
| `sortOrder` | String | `asc` or `desc` |

#### Sample Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "nsp-csss",
      "name": "Central Sector Scheme of Scholarships for College and University Students",
      "provider": "Ministry of Education, Government of India (National Scholarship Portal)",
      "category": "Merit-cum-Need",
      "amount_per_year": 20000,
      "amount_display": "₹12,000 - ₹20,000 / year",
      "duration": "Full Graduation & Post-Graduation",
      "application_deadline": "2026-11-30",
      "official_url": "https://scholarships.gov.in",
      "is_government": true,
      "min_tenth_marks": 75,
      "min_twelfth_marks": 80,
      "min_cgpa": 6.5,
      "max_family_income": 450000,
      "allowed_degrees": ["B.Tech", "B.Sc", "B.Com", "B.A", "MBBS", "BBA", "BCA", "Any"],
      "allowed_years": ["1st Year"],
      "eligible_states": ["All India"],
      "gender_requirement": "All",
      "required_documents": [
        "12th Standard Passing Marksheet & Certificate",
        "Income Certificate issued by Revenue Authority (≤ ₹4.5 LPA)",
        "College Bonafide Student Certificate",
        "Aadhaar Card linked with Bank Account",
        "Student Bank Account Passbook Copy"
      ],
      "official_notice": "Applications processed strictly through National Scholarship Portal (NSP).",
      "tags": ["Govt of India", "NSP Portal", "Undergraduate", "Merit-cum-Need"]
    }
  ],
  "pagination": {
    "total": 9,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### `GET /api/v1/scholarships/:id`
Retrieve single scholarship by ID.

#### Sample Response:
```json
{
  "success": true,
  "data": {
    "id": "reliance-ug",
    "name": "Reliance Foundation Undergraduate Scholarship 2026",
    "amount_per_year": 200000,
    "official_url": "https://www.reliancefoundation.org/scholarships"
  }
}
```

---

## 4. Scholarship Eligibility Matching Engine

### `GET /api/v1/matching` or `POST /api/v1/matching`
Evaluate student profile against all active scholarships with transparent explainability.

#### Query Options:
- `status`: Filter by `eligible`, `potentially_eligible`, `ineligible`, or `all`.
- `minScore`: Minimum match percentage (e.g. `80`).

#### Sample Response (200 OK):
```json
{
  "success": true,
  "summary": {
    "totalEvaluated": 9,
    "eligibleCount": 6,
    "potentiallyEligibleCount": 0,
    "ineligibleCount": 3,
    "strongMatchesCount": 6
  },
  "studentSummary": {
    "name": "Ananya Sharma",
    "tenth_marks": 88.5,
    "twelfth_marks": 91.2,
    "cgpa": 8.7,
    "annual_income": 320000,
    "degree": "B.Tech / B.E (Engineering)",
    "study_year": "1st Year",
    "state": "Maharashtra"
  },
  "data": [
    {
      "id": "reliance-ug",
      "name": "Reliance Foundation Undergraduate Scholarship 2026",
      "amount_per_year": 200000,
      "eligibility": {
        "status": "eligible",
        "isEligible": true,
        "isPotentiallyEligible": false,
        "matchScore": 91,
        "applicableCriteria": [
          "tenth_marks",
          "twelfth_marks",
          "cgpa",
          "family_income"
        ],
        "matchedCriteria": [
          {
            "criterion": "tenth_marks",
            "label": "10th Standard Marks",
            "reason": "10th score of 88.5% fulfills requirement (Cutoff: 60%)."
          },
          {
            "criterion": "twelfth_marks",
            "label": "12th Standard Marks",
            "reason": "12th marks (91.2%) surpasses threshold (60%) by +31.2%."
          },
          {
            "criterion": "cgpa",
            "label": "College CGPA",
            "reason": "CGPA 8.7/10.0 meets requirement of 7."
          },
          {
            "criterion": "family_income",
            "label": "Annual Family Income",
            "reason": "Family income (₹3.20 LPA) is within eligible limit (≤ ₹15.0 LPA)."
          }
        ],
        "unmetCriteria": [],
        "unknownCriteria": [],
        "summaryReason": "All mandatory academic and financial criteria satisfied."
      }
    }
  ]
}
```

---

## 5. Dashboard Summary API

### `GET /api/v1/dashboard`
Returns live non-expired metrics, deduplicated scholarship stats, and upcoming deadlines.

#### Sample Response (200 OK):
```json
{
  "success": true,
  "data": {
    "metrics": {
      "eligible_scholarships_count": 6,
      "strong_matches_count": 6,
      "upcoming_deadlines_count": 4,
      "estimated_financial_aid": 384000,
      "formatted_estimated_aid": "₹3.84 Lakhs",
      "total_active_scanned": 9
    },
    "student": {
      "id": "a0000000-0000-0000-0000-000000000001",
      "full_name": "Ananya Sharma",
      "cgpa": 8.7,
      "annual_income": 320000
    },
    "upcoming_deadlines": [
      {
        "id": "mahindra-talent",
        "name": "KC Mahindra All India Talent Scholarship for Polytechnic & Diploma",
        "daysLeft": 7,
        "application_deadline": "2026-10-18",
        "official_url": "https://www.kcmet.org/what-we-do-scholarships-all-india-talent.aspx"
      },
      {
        "id": "reliance-ug",
        "name": "Reliance Foundation Undergraduate Scholarship 2026",
        "daysLeft": 14,
        "application_deadline": "2026-10-25",
        "official_url": "https://www.reliancefoundation.org/scholarships"
      }
    ],
    "top_matched_scholarships": [ /* Top 3 schemes sorted by match score */ ]
  }
}
```

---

## 6. Application Tracker API

### `GET /api/v1/tracker`
List tracked scholarship applications with document readiness and deadline countdowns.

#### Sample Response (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "b1000000-0000-0000-0000-000000000001",
      "student_id": "a0000000-0000-0000-0000-000000000001",
      "scholarship_id": "reliance-ug",
      "status": "submitted",
      "daysLeft": 14,
      "document_checklist": {
        "Class 10th & 12th Board Marksheet": { "ready": true },
        "Proof of College Admission / Bonafide Certificate": { "ready": true },
        "Official Family Income Certificate or ITR": { "ready": true },
        "Aadhaar Identity Card": { "ready": true },
        "Online Aptitude Test Score Card": { "ready": true }
      },
      "notes": "Online aptitude test submitted on October 5th.",
      "applied_date": "2026-10-05",
      "scholarship": {
        "name": "Reliance Foundation Undergraduate Scholarship 2026",
        "amount_display": "Up to ₹2,00,000 total grant",
        "official_url": "https://www.reliancefoundation.org/scholarships"
      }
    }
  ]
}
```

---

### `POST /api/v1/tracker`
Create or update an application record.

#### Request Body:
```json
{
  "scholarship_id": "tata-trusts-means",
  "status": "docs_ready",
  "document_checklist": {
    "Current Academic Year College Fee Receipt": { "ready": true },
    "Previous Semester Marksheet": { "ready": true }
  },
  "notes": "Requested fee receipt from college accounts section."
}
```

---

### `DELETE /api/v1/tracker/:scholarshipId`
Remove an application from the tracker.

#### Response:
```json
{
  "success": true,
  "message": "Application removed from tracker"
}
```

---

## 7. Financial Aid Calculator API

### `POST /api/v1/calculator/gap-analysis`
Calculates total attendance costs, confirmed resources, net funding shortfall, and recommends an optimal scholarship combination to bridge the gap.

#### Request Body:
```json
{
  "tuition_fee": 160000,
  "living_expenses": 80000,
  "books_supplies": 25000,
  "family_contribution": 100000,
  "existing_aid": 25000
}
```

#### Sample Response (200 OK):
```json
{
  "success": true,
  "data": {
    "breakdown": {
      "tuition_fee": 160000,
      "living_expenses": 80000,
      "books_supplies": 25000,
      "total_education_cost": 265000
    },
    "support": {
      "family_contribution": 100000,
      "existing_aid": 25000,
      "total_existing_support": 125000
    },
    "gap_analysis": {
      "funding_gap": 140000,
      "coverage_percentage": 47,
      "status": "moderate_gap",
      "is_fully_covered_by_family": false
    },
    "recommendations": {
      "recommended_scholarships": [
        {
          "id": "reliance-ug",
          "name": "Reliance Foundation Undergraduate Scholarship 2026",
          "provider": "Reliance Foundation",
          "amount_per_year": 200000,
          "matchScore": 91,
          "official_url": "https://www.reliancefoundation.org/scholarships"
        }
      ],
      "total_potential_bridge_aid": 200000,
      "remaining_unfunded_deficit": 0,
      "can_bridge_entire_gap": true
    }
  }
}
```
