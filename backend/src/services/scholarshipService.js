import { supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { DEFAULT_SCHOLARSHIPS } from '../database/defaultData.js';

class ScholarshipService {
  /**
   * Retrieve scholarships with search, category filtering, income ceiling, and pagination
   */
  async getScholarships({
    search = '',
    category = 'All',
    state = '',
    maxIncome = null,
    isGovernment = null,
    onlyActive = false,
    page = 1,
    limit = 10,
    sortBy = 'application_deadline',
    sortOrder = 'asc'
  }) {
    // If Supabase is live and configured, query PostgreSQL
    if (env.isSupabaseConfigured() && supabase) {
      let query = supabase.from('scholarships').select('*', { count: 'exact' });

      if (onlyActive) {
        const today = new Date().toISOString().split('T')[0];
        query = query.gte('application_deadline', today);
      }

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (isGovernment !== null && isGovernment !== undefined && isGovernment !== '') {
        query = query.eq('is_government', isGovernment === 'true' || isGovernment === true);
      }

      if (maxIncome !== null && maxIncome !== undefined && !isNaN(maxIncome)) {
        query = query.lte('max_family_income', Number(maxIncome));
      }

      if (search && search.trim()) {
        const s = search.trim();
        query = query.or(`name.ilike.%${s}%,provider.ilike.%${s}%,description.ilike.%${s}%`);
      }

      // Ordering
      const ascending = sortOrder.toLowerCase() === 'asc';
      query = query.order(sortBy || 'application_deadline', { ascending });

      // Pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      const { data, count, error } = await query;

      if (error) {
        throw new Error(`Database error querying scholarships: ${error.message}`);
      }

      return {
        scholarships: data || [],
        pagination: {
          total: count || 0,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    }

    // Local in-memory repository for local dev / testing before Supabase keys are entered
    let results = [...DEFAULT_SCHOLARSHIPS];

    if (onlyActive) {
      const today = new Date().toISOString().split('T')[0];
      results = results.filter(s => s.application_deadline >= today);
    }

    if (category && category !== 'All') {
      results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (isGovernment !== null && isGovernment !== undefined && isGovernment !== '') {
      const isGov = isGovernment === 'true' || isGovernment === true;
      results = results.filter(s => s.is_government === isGov);
    }

    if (maxIncome !== null && maxIncome !== undefined && !isNaN(maxIncome)) {
      results = results.filter(s => s.max_family_income <= Number(maxIncome));
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    results.sort((a, b) => {
      let valA = a[sortBy] ?? a.application_deadline;
      let valB = b[sortBy] ?? b.application_deadline;
      if (sortOrder.toLowerCase() === 'asc') {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });

    const total = results.length;
    const offset = (page - 1) * limit;
    const paginated = results.slice(offset, offset + Number(limit));

    return {
      scholarships: paginated,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get a single scholarship by ID
   */
  async getScholarshipById(id) {
    if (env.isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw new Error(`Database error fetching scholarship: ${error.message}`);
      }
      return data;
    }

    return DEFAULT_SCHOLARSHIPS.find(s => s.id === id) || null;
  }

  /**
   * Get all active non-expired scholarships (without pagination, for matching & dashboard)
   */
  async getActiveScholarships() {
    const today = new Date().toISOString().split('T')[0];

    if (env.isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .gte('application_deadline', today);

      if (error) {
        throw new Error(`Database error fetching active scholarships: ${error.message}`);
      }
      return data || [];
    }

    return DEFAULT_SCHOLARSHIPS.filter(s => s.application_deadline >= today);
  }
}

export const scholarshipService = new ScholarshipService();
