import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  authMode: process.env.AUTH_MODE || 'dev', // 'strict' | 'dev'
  isSupabaseConfigured() {
    return (
      Boolean(this.supabaseUrl) &&
      this.supabaseUrl.startsWith('https://') &&
      !this.supabaseUrl.includes('your-project-id') &&
      Boolean(this.supabaseAnonKey) &&
      !this.supabaseAnonKey.includes('demo-anon-key')
    );
  }
};
