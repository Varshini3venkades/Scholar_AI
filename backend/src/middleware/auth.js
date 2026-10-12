import { env } from '../config/env.js';
import { supabase } from '../config/supabase.js';

export async function authenticateStudent(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 1. If valid Supabase client and token provided, verify with Supabase Auth
    if (token && supabase) {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data?.user) {
        req.user = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role || 'authenticated',
          token
        };
        return next();
      }
    }

    // 2. Strict mode check
    if (env.authMode === 'strict') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Valid Supabase JWT Bearer token required.'
      });
    }

    // 3. Dev / Hackathon mode fallback
    // Allow custom student ID in header or use the default seeded demo student ID
    const demoStudentId = req.headers['x-student-id'] || 'a0000000-0000-0000-0000-000000000001';
    req.user = {
      id: demoStudentId,
      email: 'ananya.demo@scholarmatch.ai',
      role: 'demo_user',
      token: token || null
    };

    return next();
  } catch (err) {
    return next(err);
  }
}
