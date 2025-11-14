import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljljpdacikvdcyeqvxrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbGpwZGFjaWt2ZGN5ZXF2eHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY3OTcsImV4cCI6MjA3NjAwMjc5N30.7_tCQUq2CRbBZkt4u7a1LfLRkJwqBnhdq5w3RsUx-Uo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log setup instructions on first load
console.log(
  '%c🚀 AromaIQ Supabase Setup',
  'background: #8B6F47; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;',
  '\n\n⚠️  IMPORTANT: If you see database errors, you need to run the setup script!\n\n' +
  '📋 Follow these steps:\n' +
  '1. Open SUPABASE_SETUP.md in the project root\n' +
  '2. Copy the SQL from database-setup.sql\n' +
  '3. Run it in your Supabase SQL Editor\n\n' +
  '🔗 Dashboard: https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz\n'
);

// Database types
export interface WaitlistEntry {
  id?: string;
  name: string;
  email: string;
  source?: string;
  created_at?: string;
  auth_provider?: 'email' | 'google' | 'waitlist';
}
