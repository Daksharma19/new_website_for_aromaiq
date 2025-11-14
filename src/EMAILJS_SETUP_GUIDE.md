# EmailJS Setup Guide for AromaIQ

This guide will help you set up **EmailJS** to send real welcome emails to your waitlist users. EmailJS is perfect for frontend applications because it doesn't require a backend server!

## Why EmailJS?

- ✅ **No backend required** - Works directly from the frontend
- ✅ **Free tier** - 200 emails/month (perfect for testing and early launches)
- ✅ **Easy setup** - 10 minutes to configure
- ✅ **Secure** - No API keys exposed in frontend code
- ✅ **Reliable** - Battle-tested email delivery

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create a free account using your email or Google sign-in

### 2. Add an Email Service

1. Once logged in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal/startup)
   - **Outlook** (if you use Microsoft)
   - **Custom SMTP** (for custom domains)
4. Click **"Connect Account"** and authorize EmailJS to send emails on your behalf
5. **Important:** Copy your **Service ID** (looks like `service_abc123`)

### 3. Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Configure your template:

   **Template Name:** AromaIQ Waitlist Welcome

   **Subject:**
   ```
   Welcome to AromaIQ - You're on the Waitlist! 🌿
   ```

   **Content (Body):**
   ```
   Hi {{to_name}},

   Thank you for joining the AromaIQ waitlist! We're thrilled to have you on this journey with us.

   AromaIQ is revolutionizing the way people experience aromatherapy by blending smart technology with natural wellness. Our intelligent diffuser adapts to your mood, preferences, and lifestyle to create the perfect aromatic environment.

   What's Next?
   • You'll be among the first to know when we launch
   • Exclusive early-bird pricing for waitlist members  
   • Behind-the-scenes updates on our development
   • Priority access to our beta program

   We'll keep you updated with exciting news and developments. In the meantime, feel free to follow us on social media for the latest updates!

   Stay fresh,
   The AromaIQ Team

   ---
   You're receiving this email because you joined the AromaIQ waitlist.
   © 2025 AromaIQ. All rights reserved.
   ```

   **To Email:**
   ```
   {{to_email}}
   ```

   **From Name:**
   ```
   {{from_name}}
   ```

   **From Email:** (Use your verified email address)
   ```
   your-email@gmail.com
   ```

4. Click **"Save"**
5. **Important:** Copy your **Template ID** (looks like `template_xyz789`)

### 4. Get Your Public Key

1. Go to **"Account"** in the left sidebar
2. Find your **Public Key** (also called User ID)
3. It looks like: `user_abc123XYZ789`
4. **Important:** Copy this key

### 5. Update Your Code

Open `/lib/resend.ts` and replace these lines:

```typescript
// ⚠️ REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'; // Replace with your actual Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'; // Replace with your Template ID
```

With your actual credentials:

```typescript
// ✅ YOUR EMAILJS CREDENTIALS
const EMAILJS_PUBLIC_KEY = 'user_abc123XYZ789'; // Your Public Key from Account page
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your Service ID from Email Services
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID from Email Templates
```

## Testing

1. Save your changes to `/lib/resend.ts`
2. Go to your AromaIQ website
3. Click **"Join Waitlist"**
4. Fill out the form with your email
5. Submit the form
6. Check your email inbox! 📧

## Troubleshooting

### "Failed to send email"
- **Solution:** Check that all three IDs are correct in `/lib/resend.ts`
- Verify your email service is connected in EmailJS dashboard

### "Template not found"
- **Solution:** Make sure your Template ID is correct
- Check that template variables match: `to_email`, `to_name`, `from_name`

### Emails going to spam
- **Solution:** Add your domain to SPF/DKIM records (advanced)
- For testing, check your spam folder and mark as "Not Spam"

### Gmail blocking emails
- **Solution:** Enable "Less secure app access" in Gmail settings
- Or use OAuth2 (EmailJS supports this)

## Free Tier Limits

- **200 emails per month** on free plan
- **50 emails per day** maximum
- Perfect for testing and early launches!
- Upgrade to paid plan when you need more

## Alternative: Upgrade Your Template (HTML)

For a more beautiful email, you can use HTML in your template. Here's a premium template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f9f7f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #d4a574 0%, #c9996b 100%); padding: 40px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 32px;">🌿 AromaIQ</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="margin: 0 0 20px 0; color: #2c2c2c; font-size: 24px;">Welcome, {{to_name}}!</h2>
            
            <p style="margin: 0 0 20px 0; color: #5a5a5a; font-size: 16px; line-height: 1.6;">
                Thank you for joining the AromaIQ waitlist! We're thrilled to have you on this journey with us.
            </p>
            
            <div style="background-color: #f9f7f4; border-left: 4px solid #d4a574; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #2c2c2c; font-size: 18px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #5a5a5a; font-size: 15px; line-height: 1.8;">
                    <li>You'll be among the first to know when we launch</li>
                    <li>Exclusive early-bird pricing for waitlist members</li>
                    <li>Behind-the-scenes updates on our development</li>
                    <li>Priority access to our beta program</li>
                </ul>
            </div>
            
            <p style="margin: 30px 0 0 0; color: #5a5a5a; font-size: 16px;">
                Stay fresh,<br>
                <strong style="color: #d4a574;">The AromaIQ Team</strong>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9f7f4; padding: 30px; text-align: center; border-top: 1px solid #e8e6e3;">
            <p style="margin: 0; color: #8a8a8a; font-size: 12px;">
                © 2025 AromaIQ. All rights reserved.
            </p>
        </div>
        
    </div>
</body>
</html>
```

## Security Notes

✅ **Safe to use in frontend** - EmailJS handles security
✅ **Public Key is meant to be public** - It's safe to include in your code
✅ **No sensitive data exposed** - Your email credentials stay in EmailJS

## Need Help?

- 📖 [EmailJS Documentation](https://www.emailjs.com/docs/)
- 💬 [EmailJS Support](https://www.emailjs.com/docs/support/)
- 🎥 [Video Tutorial](https://www.youtube.com/results?search_query=emailjs+tutorial)

---

**That's it!** Your AromaIQ waitlist will now send beautiful welcome emails to every new subscriber. 🎉
