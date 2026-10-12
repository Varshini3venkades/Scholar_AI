import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

let supabaseClient = null;
let supabaseAdminClient = null;

if (env.isSupabaseConfigured()) {
  supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const adminKey = env.supabaseServiceKey || env.supabaseAnonKey;
  supabaseAdminClient = createClient(env.supabaseUrl, adminKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  console.log(`[Supabase] Live client initialized for: ${env.supabaseUrl}`);
} else {
  console.log('[Supabase] Warning: Live SUPABASE_URL not configured. Running in local test environment.');
}

/**
 * Returns user-scoped Supabase client that sends JWT in Authorization header for Row-Level Security
 */
export function getSupabaseUserClient(authToken) {
  if (!env.isSupabaseConfigured()) return null;
  
  if (!authToken) return supabaseClient;

  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
      }
    },
    auth: {
      persistSession: false
    }
  });
}

/**
 * Quick connection check
 */
export async function checkSupabaseHealth() {
  if (!env.isSupabaseConfigured() || !supabaseClient) {
    return {
      connected: false,
      mode: 'local_fallback',
      message: 'SUPABASE_URL or keys not configured in backend/.env'
    };
  }

  try {
    const { data, error } = await supabaseClient
      .from('scholarships')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return {
        connected: false,
        mode: 'supabase_error',
        message: error.message
      };
    }

    return {
      connected: true,
      mode: 'supabase_live',
      message: 'Successfully connected to PostgreSQL via Supabase'
    };
  } catch (err) {
    return {
      connected: false,
      mode: 'network_error',
      message: err.message
    };
  }
}

export const supabase = supabaseClient;
export const supabaseAdmin = supabaseAdminClient;
