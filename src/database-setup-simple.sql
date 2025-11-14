-- AromaIQ Waitlist Table Setup (Simplified Version)
-- Run this SQL in your Supabase SQL Editor
-- This version avoids potential schema errors

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Anyone can view waitlist entries" ON waitlist;

-- Drop existing table if you want to start fresh (CAUTION: This deletes all data!)
-- Uncomment the line below ONLY if you want to delete all existing waitlist data
-- DROP TABLE IF EXISTS waitlist CASCADE;

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  auth_provider TEXT DEFAULT 'waitlist',
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

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at DESC);

-- Verify the table was created successfully
SELECT 'Table created successfully!' AS status;
SELECT * FROM waitlist LIMIT 1;
