import { getSupabaseUserClient, supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { DEFAULT_SCHOLARSHIPS } from '../database/defaultData.js';

// Local store for fallback dev mode
const localApplications = new Map();

// Seed initial sample applications for demo student
localApplications.set('a0000000-0000-0000-0000-000000000001_reliance-ug', {
  id: 'b1000000-0000-0000-0000-000000000001',
  student_id: 'a0000000-0000-0000-0000-000000000001',
  scholarship_id: 'reliance-ug',
  status: 'submitted',
  document_checklist: {
    'Class 10th & 12th Board Marksheet': { ready: true },
    'Proof of College Admission / Bonafide Certificate': { ready: true },
    'Official Family Income Certificate or ITR': { ready: true },
    'Aadhaar Identity Card': { ready: true },
    'Online Aptitude Test Score Card': { ready: true }
  },
  notes: 'Online aptitude test submitted on October 5th. Awaiting interview schedule.',
  applied_date: '2026-10-05',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

localApplications.set('a0000000-0000-0000-0000-000000000001_nsp-csss', {
  id: 'b1000000-0000-0000-0000-000000000002',
  student_id: 'a0000000-0000-0000-0000-000000000001',
  scholarship_id: 'nsp-csss',
  status: 'docs_ready',
  document_checklist: {
    '12th Standard Passing Marksheet & Certificate': { ready: true },
    'Income Certificate issued by Revenue Authority (≤ ₹4.5 LPA)': { ready: true },
    'College Bonafide Student Certificate': { ready: true },
    'Aadhaar Card linked with Bank Account': { ready: true },
    'Student Bank Account Passbook Copy': { ready: false }
  },
  notes: 'Need to seed bank account with Aadhaar at bank branch before submission.',
  applied_date: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

class TrackerService {
  /**
   * Retrieve all applications tracked by student, joined with scholarship details
   */
  async getStudentApplications(studentId, authToken = null) {
    if (env.isSupabaseConfigured()) {
      const client = getSupabaseUserClient(authToken) || supabase;
      const { data, error } = await client
        .from('applications')
        .select(`
          *,
          scholarship:scholarships(*)
        `)
        .eq('student_id', studentId)
        .order('updated_at', { ascending: false });

      if (error) {
        throw new Error(`Database error fetching applications: ${error.message}`);
      }

      return data || [];
    }

    // Dev fallback
    const apps = Array.from(localApplications.values()).filter(a => a.student_id === studentId);
    return apps.map(app => {
      const sch = DEFAULT_SCHOLARSHIPS.find(s => s.id === app.scholarship_id) || null;
      return {
        ...app,
        scholarship: sch
      };
    });
  }

  /**
   * Create or update application record
   */
  async upsertApplication(studentId, payload, authToken = null) {
    const scholarshipId = payload.scholarship_id || payload.scholarshipId;
    if (!scholarshipId) {
      throw new Error('scholarship_id is required');
    }

    const applicationRecord = {
      student_id: studentId,
      scholarship_id: scholarshipId,
      status: payload.status || 'docs_ready',
      document_checklist: payload.document_checklist || payload.documentChecklist || {},
      notes: payload.notes || null,
      applied_date: payload.applied_date || payload.appliedDate || null,
      updated_at: new Date().toISOString()
    };

    if (env.isSupabaseConfigured()) {
      const client = getSupabaseUserClient(authToken) || supabase;
      const { data, error } = await client
        .from('applications')
        .upsert(applicationRecord, { onConflict: 'student_id,scholarship_id' })
        .select(`
          *,
          scholarship:scholarships(*)
        `)
        .single();

      if (error) {
        throw new Error(`Database error saving application: ${error.message}`);
      }

      return data;
    }

    // Dev fallback
    const key = `${studentId}_${scholarshipId}`;
    const existing = localApplications.get(key) || {
      id: `b1000000-${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString()
    };

    const saved = {
      ...existing,
      ...applicationRecord
    };

    localApplications.set(key, saved);
    const sch = DEFAULT_SCHOLARSHIPS.find(s => s.id === scholarshipId) || null;
    return {
      ...saved,
      scholarship: sch
    };
  }

  /**
   * Delete tracked application
   */
  async deleteApplication(studentId, scholarshipId, authToken = null) {
    if (env.isSupabaseConfigured()) {
      const client = getSupabaseUserClient(authToken) || supabase;
      const { error } = await client
        .from('applications')
        .delete()
        .eq('student_id', studentId)
        .eq('scholarship_id', scholarshipId);

      if (error) {
        throw new Error(`Database error deleting application: ${error.message}`);
      }

      return true;
    }

    const key = `${studentId}_${scholarshipId}`;
    return localApplications.delete(key);
  }
}

export const trackerService = new TrackerService();
