# 🚀 AromaIQ Setup Checklist

Complete these steps to get the waitlist fully functional with email notifications.

## ✅ Quick Setup Checklist

### 1. Database Setup (Required)

- [ ] Open Supabase SQL Editor: https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz/sql
- [ ] Copy all SQL from `/database-setup-simple.sql`
- [ ] Paste into SQL Editor and click "RUN"
- [ ] Verify success: Go to Table Editor → see "waitlist" table
- [ ] **Test it:** Try adding a test entry manually

**Expected result:** Table created with columns: id, name, email, source, auth_provider, created_at

---

### 2. Email Setup (Required for notifications)

- [ ] Sign up at https://resend.com (free tier available)
- [ ] Verify your email address
- [ ] Go to **API Keys** in Resend dashboard
- [ ] Click **Create API Key**
- [ ] Name it "AromaIQ Production"
- [ ] Copy the API key (starts with `re_`)
- [ ] Open `/lib/resend.ts` in your code editor
- [ ] Replace `YOUR_RESEND_API_KEY` with your actual key
- [ ] Save the file

**Expected result:** `RESEND_API_KEY` in `/lib/resend.ts` contains your actual key

---

### 3. Test the Integration

#### Database Test
- [ ] Open your AromaIQ website
- [ ] Click "Join Waitlist"
- [ ] Fill in:
  - Name: Test User
  - Email: your-real-email@example.com
  - Source: Instagram
- [ ] Submit the form
- [ ] ✅ See success animation
- [ ] ✅ See "Welcome to AromaIQ!"
- [ ] ✅ Auto-redirect to home page
- [ ] Open Supabase Table Editor → waitlist table
- [ ] ✅ Verify your entry appears

#### Email Test
- [ ] Check your email inbox (the one you used in the form)
- [ ] ✅ Verify you received "Welcome to AromaIQ" email
- [ ] ✅ Check it displays correctly
- [ ] ✅ Verify sender is "AromaIQ <onboarding@resend.dev>"

#### Duplicate Test
- [ ] Click "Join Waitlist" again
- [ ] Use the SAME email as before
- [ ] Submit the form
- [ ] ✅ See "You're already on the waitlist 🌿"
- [ ] ✅ No duplicate entry in database
- [ ] ✅ No second email sent

---

## 📊 Verification Steps

### Check Browser Console

Open browser DevTools (F12) → Console tab, you should see:

✅ **On successful signup:**
```
✅ Successfully added to waitlist: {...}
✅ Email sent successfully: {...}
📧 Welcome email sent successfully to: email@example.com
```

⚠️ **If email fails (but signup succeeds):**
```
✅ Successfully added to waitlist: {...}
⚠️ Email sending failed (non-critical): Error message
```

### Check Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz
2. Click **Table Editor** → **waitlist**
3. Verify your test entries appear
4. Check the columns match: name, email, source, auth_provider, created_at

### Check Resend Dashboard

1. Go to: https://resend.com/emails
2. Verify your sent email appears
3. Check delivery status: "Delivered"
4. Click on the email to see details
5. If status is "Bounced" or "Failed", see troubleshooting

---

## 🎯 Success Criteria

You've successfully set up AromaIQ when ALL of these are true:

- ✅ Database table exists in Supabase
- ✅ Test user was added successfully
- ✅ Welcome email was received
- ✅ Duplicate email shows friendly message
- ✅ No errors in browser console
- ✅ Resend dashboard shows "Delivered" status

---

## ⚠️ Troubleshooting Common Issues

### Database Issues

**Error: "schema 'net' does not exist"**
- ✅ Solution: You already used the correct file (`database-setup-simple.sql`)
- If still happening, see `/QUICK_FIX.md`

**Error: "relation 'waitlist' does not exist"**
- ❌ Problem: Database setup wasn't run
- ✅ Solution: Run `/database-setup-simple.sql` in Supabase SQL Editor

**Error: "duplicate key value violates unique constraint"**
- ✅ This is expected! The app handles this gracefully
- Shows: "You're already on the waitlist"

### Email Issues

**No email received**

Check 1: API Key
- [ ] Open `/lib/resend.ts`
- [ ] Verify `RESEND_API_KEY` is NOT `'YOUR_RESEND_API_KEY'`
- [ ] Verify it starts with `re_`

Check 2: Spam Folder
- [ ] Check your spam/junk folder
- [ ] Mark as "Not Spam" if found

Check 3: Resend Dashboard
- [ ] Go to https://resend.com/emails
- [ ] Check if email appears
- [ ] Look at delivery status
- [ ] Click email for detailed logs

Check 4: Email Address
- [ ] Verify you used a real email address
- [ ] With free tier, you can only send to verified emails
- [ ] Verify your email in Resend dashboard if needed

**Email goes to spam**
- ✅ This is common with `onboarding@resend.dev`
- ✅ For production, verify your own domain in Resend
- ✅ See `/RESEND_SETUP.md` → "Configure Email Sender"

**Rate limit errors**
- Free tier: 100 emails/day, 3,000/month
- ✅ Wait until tomorrow, or upgrade plan

### Frontend Issues

**Form won't submit**
- [ ] Check browser console for errors
- [ ] Verify all fields are filled
- [ ] Try a different email address
- [ ] Check internet connection

**Success animation shows but no database entry**
- [ ] Check Supabase logs in dashboard
- [ ] Verify RLS policies are enabled
- [ ] Re-run `/database-setup-simple.sql`

---

## 📚 Additional Resources

- **Database Issues:** `/TROUBLESHOOTING.md` or `/QUICK_FIX.md`
- **Email Issues:** `/RESEND_SETUP.md`
- **Full Integration Details:** `/INTEGRATION_SUMMARY.md`
- **Supabase Setup:** `/SUPABASE_SETUP.md`
- **Waitlist Guide:** `/WAITLIST_INTEGRATION.md`

---

## 🆘 Still Need Help?

### Check These in Order:

1. **Browser Console** (F12 → Console)
   - Look for red error messages
   - Copy the full error text

2. **Supabase Logs** 
   - Dashboard → Logs
   - Filter by "Error"
   - Look for recent errors

3. **Resend Logs**
   - Dashboard → Emails
   - Click on your email
   - Check delivery details

4. **Status Pages**
   - Supabase: https://status.supabase.com
   - Resend: https://status.resend.com

### Common Quick Fixes:

```bash
# Browser cache issues
Ctrl+Shift+R (hard refresh)

# Database issues
Re-run /database-setup-simple.sql

# Email issues
Check API key in /lib/resend.ts
```

---

**Status:** Ready to deploy! 🚀  
**Time to complete:** ~10 minutes  
**Difficulty:** Beginner-friendly ✅
