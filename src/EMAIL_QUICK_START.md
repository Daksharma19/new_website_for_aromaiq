# Quick Start: Enable Real Emails (5 Minutes)

Your waitlist currently works, but emails are in **demo mode**. Follow these steps to enable real email sending:

## ⚡ Quick Setup (5 Minutes)

### 1. Sign Up for EmailJS (2 min)
- Go to **https://www.emailjs.com/**
- Click **"Sign Up"** (Free - 200 emails/month)
- Use Google sign-in for fastest setup

### 2. Connect Your Email (2 min)
1. Click **"Email Services"** → **"Add New Service"**
2. Select **"Gmail"** (easiest option)
3. Click **"Connect Account"** and authorize
4. **Copy your Service ID** (e.g., `service_abc123`)

### 3. Create Template (1 min)
1. Click **"Email Templates"** → **"Create New Template"**
2. Set these fields:
   - **To Email:** `{{to_email}}`
   - **From Name:** `{{from_name}}`
   - **Subject:** `Welcome to AromaIQ - You're on the Waitlist! 🌿`
   - **Content:** Copy from `/EMAILJS_SETUP_GUIDE.md` (or write your own)
3. Click **"Save"**
4. **Copy your Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Click **"Account"** in sidebar
2. **Copy your Public Key** (e.g., `user_abc123XYZ789`)

### 5. Update Your Code
Open `/lib/resend.ts` and replace these three lines:

```typescript
const EMAILJS_PUBLIC_KEY = 'user_abc123XYZ789'; // Your Public Key
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your Service ID  
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID
```

## ✅ Test It!

1. Save the file
2. Go to your website
3. Click **"Join Waitlist"**
4. Submit your email
5. Check your inbox! 📧

---

## Current Status

❌ **Before setup:** Emails logged to console only  
✅ **After setup:** Real emails sent to users  

## Need Detailed Instructions?

See `/EMAILJS_SETUP_GUIDE.md` for complete step-by-step guide with screenshots and troubleshooting.

---

**That's it!** You'll be sending real emails in 5 minutes. 🚀
