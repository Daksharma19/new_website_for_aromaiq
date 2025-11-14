# Supabase Setup Instructions for AromaIQ

## ⚠️ IMPORTANT: Database Setup Required

**Before the authentication will work properly, you MUST run the database setup script!**

## Quick Start (Recommended)

Use the simplified setup to avoid schema errors:

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Simplified Database Setup**
   - Copy the entire contents of `database-setup-simple.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute the script

4. **Verify the Setup**
   - You should see "Table created successfully!" message
   - Go to "Table Editor" and verify the "waitlist" table exists

---

## Alternative Setup (Advanced)

### Step-by-Step Setup:

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Database Setup Script**
   - Copy the entire contents of `database-setup.sql` (in the root of this project)
   - Paste it into the SQL editor
   - Click "Run" to execute the script

4. **Verify the Setup**
   - Go to "Table Editor" in the left sidebar
   - You should see a new table called "waitlist"
   - The table should have columns: id, name, email, source, auth_provider, created_at

This will create:
- A `waitlist` table to store user information (name, email, source)
- Row Level Security policies for data protection
- Indexes for better performance
- Unique constraint on email to prevent duplicates

## Email Notifications

The waitlist form automatically triggers email notifications through the Edge Function `send-waitlist-email`. 
No additional email configuration is needed in the frontend - the Edge Function handles all email sending automatically when a new user is added to the waitlist table.

## ⚠️ Troubleshooting

If you see an error like **"schema 'net' does not exist"**:

1. **Use the simplified setup** (`database-setup-simple.sql`) instead
2. **OR** enable the `pg_net` extension:
   - Go to Database → Extensions
   - Search for "pg_net"
   - Click "Enable"

**For more detailed troubleshooting, see `/TROUBLESHOOTING.md`**

---

## Testing

After setup, you can:
1. Join the waitlist through the website
2. View the data in Supabase:
   - Go to "Table Editor" in your Supabase dashboard
   - Select the "waitlist" table
   - See all registered users

## Features Implemented

✅ Waitlist Registration (Name, Email, Source)
✅ Duplicate Email Prevention with Friendly Messages
✅ Email Validation (Client & Server-side)
✅ Success Animations
✅ Auto-redirect to Home Page
✅ Toast Notifications
✅ Dark/Light Mode Support
✅ Automatic Email Notifications via Edge Function

## Waitlist Form Fields

The form collects the following information:
- **Name**: User's full name (required)
- **Email**: User's email address (required, validated, unique)
- **Source**: Where the user heard about AromaIQ (required)
  - Instagram
  - Google Search
  - LinkedIn
  - Friend/Family
  - Other

## Error Handling

The form handles various scenarios gracefully:
- Empty fields: Shows validation error
- Invalid email format: Shows format error
- Duplicate email: Shows "You're already on the waitlist 🌿 We'll keep you updated!" message
- Database errors: Shows user-friendly error messages
