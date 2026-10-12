-- =========================================================================
-- ScholarMatch AI - Complete PostgreSQL Database Schema for Supabase
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  tenth_marks NUMERIC(5,2) NULL CHECK (tenth_marks >= 0 AND tenth_marks <= 100),
  twelfth_marks NUMERIC(5,2) NULL CHECK (twelfth_marks >= 0 AND twelfth_marks <= 100),
  cgpa NUMERIC(4,2) NULL CHECK (cgpa >= 0 AND cgpa <= 10),
  degree TEXT NOT NULL,
  degree_short TEXT NULL,
  study_year TEXT NOT NULL,
  annual_income NUMERIC(14,2) NOT NULL CHECK (annual_income >= 0),
  state TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT 'All',
  category_preference TEXT NOT NULL DEFAULT 'All',
  tuition_fee NUMERIC(12,2) NOT NULL DEFAULT 150000,
  living_expenses NUMERIC(12,2) NOT NULL DEFAULT 70000,
  books_supplies NUMERIC(12,2) NOT NULL DEFAULT 20000,
  family_contribution NUMERIC(12,2) NOT NULL DEFAULT 80000,
  existing_aid NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SCHOLARSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.scholarships (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  category TEXT NOT NULL,
  amount_per_year NUMERIC(14,2) NOT NULL,
  amount_display TEXT NOT NULL,
  duration TEXT NOT NULL,
  application_deadline DATE NOT NULL,
  official_url TEXT NOT NULL,
  is_government BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  
  -- Flexible criteria (nullable because not all schemes require every metric)
  min_tenth_marks NUMERIC(5,2) NULL,
  min_twelfth_marks NUMERIC(5,2) NULL,
  min_cgpa NUMERIC(4,2) NULL,
  max_family_income NUMERIC(14,2) NULL,
  gender_requirement TEXT NOT NULL DEFAULT 'All',
  allowed_degrees TEXT[] NOT NULL DEFAULT '{"Any"}',
  allowed_years TEXT[] NOT NULL DEFAULT '{"Any"}',
  eligible_states TEXT[] NOT NULL DEFAULT '{"All India"}',
  
  required_documents TEXT[] NOT NULL DEFAULT '{}',
  official_notice TEXT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. APPLICATIONS TABLE (Tracker & Checklist)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scholarship_id TEXT NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'docs_ready' 
    CHECK (status IN ('not_started', 'docs_ready', 'submitted', 'under_review', 'awarded', 'rejected')),
  document_checklist JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT NULL,
  applied_date DATE NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_scholarship UNIQUE (student_id, scholarship_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scholarships_deadline ON public.scholarships(application_deadline);
CREATE INDEX IF NOT EXISTS idx_scholarships_category ON public.scholarships(category);
CREATE INDEX IF NOT EXISTS idx_scholarships_income ON public.scholarships(max_family_income);
CREATE INDEX IF NOT EXISTS idx_applications_student ON public.applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- =========================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Students can only view, create, or update their own row
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
CREATE POLICY "Profiles are viewable by owner" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id OR auth.uid() IS NULL);

-- Scholarships: Public read-access (Anyone can browse verified scholarships)
DROP POLICY IF EXISTS "Scholarships are viewable by everyone" ON public.scholarships;
CREATE POLICY "Scholarships are viewable by everyone" 
  ON public.scholarships FOR SELECT 
  USING (true);

-- Applications: Students can only manage their own tracked applications
DROP POLICY IF EXISTS "Users can view own applications" ON public.applications;
CREATE POLICY "Users can view own applications" 
  ON public.applications FOR SELECT 
  USING (auth.uid() = student_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can insert own applications" ON public.applications;
CREATE POLICY "Users can insert own applications" 
  ON public.applications FOR INSERT 
  WITH CHECK (auth.uid() = student_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can update own applications" ON public.applications;
CREATE POLICY "Users can update own applications" 
  ON public.applications FOR UPDATE 
  USING (auth.uid() = student_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can delete own applications" ON public.applications;
CREATE POLICY "Users can delete own applications" 
  ON public.applications FOR DELETE 
  USING (auth.uid() = student_id OR auth.uid() IS NULL);
