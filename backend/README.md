# ScholarMatch AI – Backend API

RESTful API backend for **ScholarMatch AI**, an AI-powered scholarship matching and financial aid assistant.

Built with **Node.js + Express.js + PostgreSQL via Supabase**.

---

## 📁 Project Architecture

```
backend/
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── package.json              # Node.js dependencies and scripts
├── docs/
│   └── API_DOCUMENTATION.md  # Complete REST API reference & examples
├── src/
│   ├── config/
│   │   ├── env.js            # Environment validator
│   │   └── supabase.js       # Supabase client & RLS token handler
│   ├── database/
│   │   ├── schema.sql        # Supabase PostgreSQL schema with RLS & indexes
│   │   ├── seed.sql          # Seed SQL with verified schemes & demo user
│   │   └── defaultData.js    # Data fallback for instant local dev
│   ├── middleware/
│   │   ├── auth.js           # Supabase Auth verification & dev mode fallback
│   │   ├── validator.js      # Input validation with express-validator
│   │   └── errorHandler.js   # Centralized error formatter
│   ├── controllers/
│   │   ├── profileController.js     # Student profile endpoints
│   │   ├── scholarshipController.js # Scholarship search & pagination
│   │   ├── matchingController.js    # Transparent eligibility calculation
│   │   ├── dashboardController.js   # Metric summaries & upcoming deadlines
│   │   ├── trackerController.js     # Applications & document checklists
│   │   └── calculatorController.js  # Cost, funding gap, & aid bridge
│   ├── services/
│   │   ├── matchingEngine.js        # AI criteria verification engine
│   │   ├── scholarshipService.js    # Supabase scholarships data access
│   │   ├── profileService.js        # Supabase profiles data access
│   │   ├── trackerService.js        # Supabase applications data access
│   │   └── calculatorService.js     # Funding gap & bundle recommender
│   ├── routes/
│   │   ├── index.js          # API v1 aggregator & health check
│   │   ├── profileRoutes.js
│   │   ├── scholarshipRoutes.js
│   │   ├── matchingRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── trackerRoutes.js
│   │   └── calculatorRoutes.js
│   ├── server.js             # Express app setup, CORS, and listening port
│   └── test-api.js           # Automated test suite verifying all 7 endpoints
```

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default variables:
```ini
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
AUTH_MODE=dev

# Supabase PostgreSQL Credentials
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 3. Setup Supabase Database (PostgreSQL)
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and go to **SQL Editor**.
2. Run [`src/database/schema.sql`](src/database/schema.sql) to create the tables (`profiles`, `scholarships`, `applications`), indexes, and Row-Level Security policies.
3. Run [`src/database/seed.sql`](src/database/seed.sql) to insert realistic demo scholarships and test records.

### 4. Start the Server
Development mode with hot reload:
```bash
npm run dev
```

Production start:
```bash
npm start
```

### 5. Run Automated Tests
```bash
node src/test-api.js
```

---

## 🔒 Security & Data Integrity

1. **Row-Level Security (RLS)**: Student private records in `profiles` and `applications` are protected by Postgres RLS policies (`auth.uid() = student_id`).
2. **Key Isolation**: The `SUPABASE_SERVICE_ROLE_KEY` is strictly server-side and never exposed to the client.
3. **Strict Validation**: All endpoints validate data types, range bounds (10th/12th marks 0–100, CGPA 0–10, income ≥ 0), and mandatory parameters.
4. **CORS & Helmet**: Cross-Origin Resource Sharing is locked to authorized frontend domains, and secure HTTP headers are enforced.
5. **No Fake Operations**: Database queries execute real transactions against PostgreSQL; errors are surfaced with structured status codes.

---

## 📖 API Documentation
For endpoint contracts, parameters, and sample JSON payloads, see [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).
