-- AromaIQ Waitlist Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable required extensions (if not already enabled)
-- Note: You may need admin privileges for this
-- If you get permission errors, these are likely already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- If you already have a waitlist table without the 'source' column, run this first:
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS source TEXT;

-- Drop existing table if you want to start fresh (CAUTION: This deletes all data!)
-- DROP TABLE IF EXISTS waitlist CASCADE;

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  auth_provider TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert (join the waitlist)
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (for duplicate check)
CREATE POLICY "Anyone can view waitlist entries" ON waitlist
  FOR SELECT
  USING (true);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);

-- Optional: Create a function to prevent duplicate entries
CREATE OR REPLACE FUNCTION prevent_duplicate_waitlist_entry()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM waitlist WHERE email = NEW.email) THEN
    RAISE EXCEPTION 'Email already registered in waitlist';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create trigger (commented out by default)
-- CREATE TRIGGER check_duplicate_waitlist_entry
--   BEFORE INSERT ON waitlist
--   FOR EACH ROW
--   EXECUTE FUNCTION prevent_duplicate_waitlist_entry();
