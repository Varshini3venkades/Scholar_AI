import { getSupabaseUserClient, supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { DEFAULT_DEMO_PROFILE } from '../database/defaultData.js';

// Local in-memory store for fallback dev mode
const localProfiles = new Map([
  [DEFAULT_DEMO_PROFILE.id, { ...DEFAULT_DEMO_PROFILE }]
]);

class ProfileService {
  /**
   * Retrieve student profile by user ID
   */
  async getProfile(userId, authToken = null) {
    if (env.isSupabaseConfigured()) {
      const client = getSupabaseUserClient(authToken) || supabase;
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No record exists yet for this user ID
          return null;
        }
        throw new Error(`Database error fetching profile: ${error.message}`);
      }

      return data;
    }

    return localProfiles.get(userId) || null;
  }

  /**
   * Save or update student profile
   */
  async upsertProfile(userId, rawData, authToken = null) {
    // Standardize input fields (supporting both camelCase and snake_case)
    const profilePayload = {
      id: userId,
      full_name: rawData.full_name || rawData.name || rawData.fullName || 'Student',
      tenth_marks: rawData.tenth_marks ?? rawData.tenthMarks ?? null,
      twelfth_marks: rawData.twelfth_marks ?? rawData.twelfthMarks ?? null,
      cgpa: rawData.cgpa !== undefined && rawData.cgpa !== null ? Number(rawData.cgpa) : null,
      degree: rawData.degree || 'B.Tech / B.E (Engineering)',
      degree_short: rawData.degree_short || rawData.degreeShort || 'B.Tech',
      study_year: rawData.study_year || rawData.yearOfStudy || '1st Year',
      annual_income: Number(rawData.annual_income ?? rawData.annualIncome ?? 300000),
      state: rawData.state || 'All India',
      gender: rawData.gender || 'All',
      category_preference: rawData.category_preference || rawData.category || 'All',
      tuition_fee: Number(rawData.tuition_fee ?? rawData.tuitionFee ?? 150000),
      living_expenses: Number(rawData.living_expenses ?? rawData.livingExpenses ?? 70000),
      books_supplies: Number(rawData.books_supplies ?? rawData.booksSupplies ?? 20000),
      family_contribution: Number(rawData.family_contribution ?? rawData.familyContribution ?? 80000),
      existing_aid: Number(rawData.existing_aid ?? rawData.existingAid ?? 0),
      updated_at: new Date().toISOString()
    };

    if (env.isSupabaseConfigured()) {
      const client = getSupabaseUserClient(authToken) || supabase;
      const { data, error } = await client
        .from('profiles')
        .upsert(profilePayload, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        throw new Error(`Database error saving profile: ${error.message}`);
      }

      return data;
    }

    // Save locally in dev fallback
    const existing = localProfiles.get(userId) || {};
    const updated = {
      ...existing,
      ...profilePayload,
      created_at: existing.created_at || new Date().toISOString()
    };
    localProfiles.set(userId, updated);
    return updated;
  }
}

export const profileService = new ProfileService();
