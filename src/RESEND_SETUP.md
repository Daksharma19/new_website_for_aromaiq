# Resend Email Integration Setup

## ⚠️ Important: CORS Limitation

**Current Status:** Email system is in **MOCK MODE** due to browser security restrictions.

Resend's API **cannot be called directly from the browser** due to CORS (Cross-Origin Resource Sharing) policies. This is a security feature to protect your API key.

**What's Working:**
- ✅ Waitlist form works perfectly
- ✅ Users are saved to Supabase
- ✅ Success animations display
- ✅ Email flow is simulated (logged to console)

**What's Not Working:**
- ⚠️ Actual emails are not sent (mock mode)

**Solution:** See `/BACKEND_EMAIL_SOLUTION.md` for production implementation options.

---

## Overview (Original Plan)

AromaIQ was designed to use [Resend](https://resend.com) to send beautiful welcome emails to users who join the waitlist. However, this requires a backend implementation due to browser security restrictions.

## ✨ Features

- ✅ Beautiful HTML email template with AromaIQ branding
- ✅ Automatic email sending on waitlist signup
- ✅ Graceful error handling (email failure won't break the signup flow)
- ✅ Professional sender: `AromaIQ <onboarding@resend.dev>`
- ✅ Personalized emails with user's name

## 📋 Prerequisites

1. A Resend account (free tier available)
2. A verified domain (or use `onboarding@resend.dev` for testing)

## 🚀 Setup Instructions

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "AromaIQ Production")
5. Select the appropriate permissions:
   - ✅ `emails:write` (required)
6. Click **Create**
7. **IMPORTANT:** Copy the API key immediately (you won't be able to see it again)

### Step 3: Configure the API Key

1. Open `/lib/resend.ts` in your code editor
2. Find this line:
   ```typescript
   export const RESEND_API_KEY = 'YOUR_RESEND_API_KEY';
   ```
3. Replace `'YOUR_RESEND_API_KEY'` with your actual API key:
   ```typescript
   export const RESEND_API_KEY = 're_abc123def456...'; // Your actual key
   ```

### Step 4: Configure Email Sender (Optional)

By default, emails are sent from `AromaIQ <onboarding@resend.dev>`.

**For Production (Recommended):**

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Follow the DNS verification steps
4. Once verified, update `/lib/resend.ts`:
   ```typescript
   from: 'AromaIQ <hello@yourdomain.com>',
   ```

**For Testing:**
- Use `onboarding@resend.dev` (works out of the box)
- Limited to sending to your own verified email

## 🧪 Testing

### Test the Email Flow

1. Make sure you've completed the database setup (`/database-setup-simple.sql`)
2. Open your AromaIQ website
3. Click **Join Waitlist**
4. Fill in the form:
   - Name: Your Name
   - Email: your-verified-email@example.com
   - Source: Any option
5. Submit the form
6. Check your email inbox for the welcome email

### Check Email Logs

1. Go to Resend dashboard
2. Navigate to **Emails** or **Logs**
3. You should see your sent email with status
4. Click on it to see delivery details

### Browser Console Logs

Check the browser console for these logs:
- ✅ `Successfully added to waitlist: {...}`
- ✅ `Email sent successfully: {...}`
- ✅ `Welcome email sent successfully to: email@example.com`

If email sending fails:
- ⚠️ `Email sending failed (non-critical): {...}`
- This won't break the signup flow - user still gets added to waitlist

## 📧 Email Template

The email includes:
- **Subject:** "Welcome to AromaIQ - You're on the Waitlist! 🌿"
- **From:** AromaIQ <onboarding@resend.dev>
- **Design:** Premium beige/gold theme matching the website
- **Content:**
  - Personalized greeting with user's name
  - Welcome message
  - Information about AromaIQ
  - What to expect next (benefits of being on waitlist)
  - Professional footer with branding

### Customizing the Email Template

To customize the email content:

1. Open `/lib/resend.ts`
2. Find the `getWelcomeEmailTemplate()` function
3. Modify the HTML template as needed
4. Test thoroughly across different email clients

## 🔧 Troubleshooting

### Issue: Emails Not Sending

**Check 1: API Key**
```typescript
// In /lib/resend.ts
console.log('API Key configured:', RESEND_API_KEY !== 'YOUR_RESEND_API_KEY');
```

**Check 2: Resend Dashboard**
- Go to Emails/Logs in Resend dashboard
- Look for error messages
- Common issues:
  - Invalid API key
  - Rate limits exceeded
  - Domain not verified (if using custom domain)

**Check 3: Browser Console**
- Look for error messages starting with "Resend email error:"
- Check network tab for failed API requests

### Issue: Email Goes to Spam

**Solutions:**
1. **Verify your domain** (most important)
2. Add SPF, DKIM, and DMARC records (Resend provides these)
3. Use a custom domain instead of `onboarding@resend.dev`
4. Warm up your domain (start with low volume)

### Issue: API Key Exposed in Frontend

**Security Note:**
- The API key is visible in the frontend code
- For production, consider:
  1. Using a serverless function/API route to send emails
  2. Implementing rate limiting
  3. Rotating API keys regularly
  4. Using Resend's domain restrictions feature

**Quick Fix:**
- Resend API keys are relatively safe for frontend use
- They can only send emails, not read or delete
- Set up domain restrictions in Resend dashboard

### Issue: Rate Limits

**Free Tier Limits:**
- 100 emails/day
- 3,000 emails/month

**Solutions:**
1. Upgrade to a paid plan
2. Implement queuing for high traffic
3. Add rate limiting on the frontend

## 🔐 Security Best Practices

### 1. Protect Your API Key

```typescript
// ❌ Bad: Hardcoded in version control
export const RESEND_API_KEY = 're_abc123...';

// ✅ Better: Use environment variables (if supported)
export const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || 'YOUR_RESEND_API_KEY';
```

### 2. Implement Rate Limiting

Add basic rate limiting to prevent abuse:

```typescript
// Example rate limiting logic
const EMAIL_COOLDOWN = 60000; // 1 minute
const lastEmailTime = new Map<string, number>();

function canSendEmail(email: string): boolean {
  const lastSent = lastEmailTime.get(email);
  if (lastSent && Date.now() - lastSent < EMAIL_COOLDOWN) {
    return false;
  }
  return true;
}
```

### 3. Validate Email Addresses

The form already validates email format, but you can add additional checks:
- Disposable email detection
- MX record verification
- Email reputation checking

## 📊 Monitoring

### Key Metrics to Track

1. **Email Delivery Rate**
   - Check Resend dashboard daily
   - Goal: >95% delivery rate

2. **Open Rate**
   - Enable tracking in Resend
   - Typical: 20-40% for welcome emails

3. **Spam Complaints**
   - Monitor in Resend dashboard
   - Take action if >0.1%

### Set Up Alerts

1. Go to Resend dashboard → Settings
2. Enable email notifications for:
   - Failed deliveries
   - Spam complaints
   - Bounces

## 🎨 Email Customization Ideas

### A/B Testing Different Subjects

```typescript
const subjects = [
  'Welcome to AromaIQ - You\'re on the Waitlist! 🌿',
  'You\'re In! Welcome to AromaIQ 🎉',
  'Thanks for Joining AromaIQ - Exclusive Access Awaits!',
];
// Randomly select or implement proper A/B testing
```

### Adding Images

```html
<!-- In the email template -->
<img 
  src="https://yourdomain.com/email-banner.png" 
  alt="AromaIQ Diffuser"
  style="width: 100%; border-radius: 12px;"
/>
```

### Dynamic Content

```typescript
// Pass additional data to the template
function getWelcomeEmailTemplate(name: string, source?: string): string {
  const sourceMessage = source === 'friend-family' 
    ? 'We're glad your friend recommended us!'
    : 'We're excited to have you here!';
  
  // Include in template...
}
```

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Email Best Practices](https://resend.com/docs/dashboard/emails/best-practices)
- [Email Templates](https://resend.com/docs/send-with-nodejs)
- [Troubleshooting Guide](https://resend.com/docs/troubleshooting)

## 🆘 Support

If you encounter issues:

1. Check Resend's status page: [status.resend.com](https://status.resend.com)
2. Review Resend documentation
3. Check the browser console for error messages
4. Review `/TROUBLESHOOTING.md` for general issues
5. Contact Resend support (very responsive!)

---

**Status:** 🟢 Ready to use
**Action Required:** Add your Resend API key to `/lib/resend.ts`
