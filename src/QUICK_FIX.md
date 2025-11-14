# 🔧 Quick Fix: "schema 'net' does not exist" Error

## The Problem
You're seeing this error when submitting the waitlist form:
```
Waitlist error: {
  "code": "3F000",
  "details": null,
  "hint": null,
  "message": "schema \"net\" does not exist"
}
```

## The Solution (Choose One)

### ✅ Option 1: Use Simplified Setup (EASIEST)

1. Open Supabase SQL Editor:
   👉 https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz/sql

2. Copy ALL the SQL from: `database-setup-simple.sql`

3. Paste and click "RUN"

4. Test the waitlist form again ✨

---

### ✅ Option 2: Enable pg_net Extension

1. Go to Database → Extensions in Supabase Dashboard

2. Search for "pg_net"

3. Click "Enable"

4. Run the original `database-setup.sql`

---

### ✅ Option 3: Check for Database Triggers

The error might be caused by a database trigger trying to call an Edge Function. Check if you have any:

```sql
-- Run this in SQL Editor
SELECT * FROM pg_trigger WHERE tgname LIKE '%waitlist%';
```

If you see any triggers, you can drop them:
```sql
DROP TRIGGER IF EXISTS your_trigger_name ON waitlist;
```

---

## Verify It's Working

After applying the fix, test the form:

1. Click "Join Waitlist"
2. Fill in: Name, Email, Source
3. Click Submit
4. ✅ Should see success message
5. ✅ Check Supabase Table Editor → waitlist table → should see your entry

---

## Still Not Working?

See detailed troubleshooting in `/TROUBLESHOOTING.md`

Or check:
- Browser console for error messages
- Supabase Dashboard → Logs for detailed errors
- Table Editor to verify the table exists
