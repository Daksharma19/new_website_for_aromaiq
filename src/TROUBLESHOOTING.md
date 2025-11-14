# Troubleshooting Guide - AromaIQ Email & Database Integration

## EmailJS Errors

### Error: "The template ID not found"

**Full Error:**
```
❌ EmailJS error: {
  "status": 400,
  "text": "The template ID not found. To find this ID, visit https://dashboard.emailjs.com/admin/templates"
}
```

**What This Means:**
Your EmailJS credentials are not properly configured. Either:
1. You haven't created an EmailJS account yet
2. The template ID in `/lib/resend.ts` doesn't exist in your EmailJS account
3. You're using placeholder/example credentials

**Solution:**
1. Follow the quick setup guide: `/EMAIL_QUICK_START.md` (takes 5 minutes)
2. Create your FREE EmailJS account at https://www.emailjs.com/
3. Set up your email service (Gmail recommended)
4. Create an email template
5. Replace the credentials in `/lib/resend.ts` with YOUR actual values:
   ```typescript
   const EMAILJS_PUBLIC_KEY = "your_actual_public_key";
   const EMAILJS_SERVICE_ID = "your_actual_service_id";
   const EMAILJS_TEMPLATE_ID = "your_actual_template_id";
   ```

**Note:** The waitlist still works in demo mode - users are saved to the database, but welcome emails won't be sent until you configure EmailJS.

### Error: "EmailJS not configured - running in demo mode"

**What This Means:**
The placeholder values haven't been replaced with your actual EmailJS credentials.

**Solution:**
Check `/lib/resend.ts` - if you see `"YOUR_PUBLIC_KEY_HERE"`, `"YOUR_SERVICE_ID_HERE"`, or `"YOUR_TEMPLATE_ID_HERE"`, you need to replace these with your actual EmailJS credentials. See `/EMAIL_QUICK_START.md`.

**Visual Indicator:**
Look at the footer of your website - you'll see a badge showing either:
- 🟡 "Demo Mode" = Emails not configured yet
- 🟢 "Emails Active" = EmailJS working correctly

---

# Troubleshooting Guide - AromaIQ Supabase Integration

## Error: "schema 'net' does not exist"

### What This Means
This error occurs when Supabase is trying to use the `pg_net` extension (typically for Edge Functions that make HTTP requests), but the extension hasn't been enabled in your database.

### Solution Options

#### Option 1: Use the Simplified Setup (Recommended)
1. Go to your Supabase SQL Editor
2. Copy the contents of `/database-setup-simple.sql`
3. Paste and run it in the SQL Editor
4. This creates the table without requiring the `pg_net` extension

#### Option 2: Enable the pg_net Extension
1. Go to Supabase Dashboard → Database → Extensions
2. Search for "pg_net"
3. Click "Enable" on the pg_net extension
4. Run the original `/database-setup.sql` script

#### Option 3: Contact Supabase Support
If the above options don't work, the `pg_net` extension might not be available on your plan or region. Contact Supabase support or use the Edge Function without database triggers.

### Edge Function Configuration

The error suggests that your Edge Function `send-waitlist-email` might be trying to use database triggers. Here are two approaches:

#### Approach A: Remove Database Triggers (If Any)
If you have any database triggers that call the Edge Function, remove them:

```sql
-- Run this in Supabase SQL Editor to check for triggers
SELECT * FROM pg_trigger WHERE tgname LIKE '%waitlist%';

-- If you find triggers, drop them:
-- DROP TRIGGER IF EXISTS trigger_name ON waitlist;
```

#### Approach B: Call Edge Function from Frontend (Recommended)
Instead of using database triggers, you can call the Edge Function directly from your frontend after successful insertion. However, since the error mentions this happens automatically, you may have a webhook or trigger set up.

## Verifying Your Setup

### Step 1: Check if Table Exists
```sql
SELECT * FROM waitlist LIMIT 5;
```

### Step 2: Check RLS Policies
```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

### Step 3: Test Insert Manually
```sql
INSERT INTO waitlist (name, email, source, auth_provider)
VALUES ('Test User', 'test@example.com', 'instagram', 'waitlist');
```

### Step 4: Check for Duplicate
```sql
-- This should fail with unique constraint error
INSERT INTO waitlist (name, email, source, auth_provider)
VALUES ('Test User 2', 'test@example.com', 'google', 'waitlist');
```

## Common Issues & Fixes

### Issue: "relation 'waitlist' does not exist"
**Fix:** Run the database setup SQL script first.

### Issue: "duplicate key value violates unique constraint"
**Fix:** This is expected behavior! The app handles this gracefully and shows "You're already on the waitlist!"

### Issue: "permission denied for table waitlist"
**Fix:** Check that RLS policies are enabled:
```sql
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
```

### Issue: Edge Function not sending emails
**Fix:** 
1. Check Edge Function logs in Supabase Dashboard
2. Verify the Edge Function is deployed
3. Check if there are any database triggers configured
4. You may need to manually call the Edge Function or set up webhooks

## Quick Fix: Start Fresh

If you're having persistent issues, you can start fresh:

```sql
-- WARNING: This deletes all waitlist data!
DROP TABLE IF EXISTS waitlist CASCADE;

-- Then run database-setup-simple.sql
```

## Checking Edge Function Setup

1. Go to Supabase Dashboard → Edge Functions
2. Check if `send-waitlist-email` is deployed
3. View the function logs to see if it's being triggered
4. If you don't have this Edge Function yet, the emails won't be sent (but the waitlist will still work)

## Database Hooks & Triggers

If you've set up database webhooks or triggers to call the Edge Function:

### Check for Webhooks
1. Go to Database → Webhooks in Supabase Dashboard
2. See if there's a webhook configured for the `waitlist` table
3. If the webhook is causing errors, you can disable it temporarily

### Check for Database Triggers
```sql
-- List all triggers on waitlist table
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'waitlist';
```

## Still Having Issues?

1. **Check the browser console** for detailed error messages
2. **Check Supabase logs** in Dashboard → Logs
3. **Verify your Supabase URL and key** in `/lib/supabase.ts`
4. **Test the connection**:
   ```javascript
   // Add this temporarily to your code
   console.log('Supabase URL:', supabase.supabaseUrl);
   console.log('Connected:', !!supabase);
   ```

## Contact & Support

If you continue to experience issues:
- Check Supabase Status: https://status.supabase.com
- Supabase Docs: https://supabase.com/docs
- Review your Supabase project logs for detailed error messages
