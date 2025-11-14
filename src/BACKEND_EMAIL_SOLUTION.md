# 🔧 Backend Email Solution Guide

## Why Do We Need a Backend?

The error you're seeing (`Failed to fetch`) occurs because **Resend's API cannot be called directly from the browser** due to CORS (Cross-Origin Resource Sharing) security restrictions. This is intentional and protects your API key from being exposed.

## Current Status

✅ **Waitlist functionality works perfectly** - Users are added to Supabase database  
⚠️ **Email sending is in MOCK MODE** - Emails are simulated, not actually sent  
📧 **Console logs show what would be sent** - You can verify the flow works

## Mock Mode vs Production

### Mock Mode (Current - Browser Only)
```
User submits form
  ↓
Added to Supabase ✅
  ↓
Email simulated (logged to console) ⚠️
  ↓
Success animation shown ✅
```

### Production Mode (Requires Backend)
```
User submits form
  ↓
Added to Supabase ✅
  ↓
Frontend calls backend endpoint
  ↓
Backend calls Resend API ✅
  ↓
Email sent successfully 📧
  ↓
Success animation shown ✅
```

---

## Solution 1: Supabase Edge Function (Recommended) ⭐

**Best for:** Projects already using Supabase  
**Difficulty:** Medium  
**Cost:** Free tier available  
**Time:** 20-30 minutes

### Step 1: Create Edge Function

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Log in to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref ljljpdacikvdcyeqvxrz
```

4. Create the Edge Function:
```bash
supabase functions new send-welcome-email
```

5. Edit `supabase/functions/send-welcome-email/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { email, name } = await req.json()

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AromaIQ <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to AromaIQ - You\'re on the Waitlist! 🌿',
        html: getWelcomeEmailTemplate(name),
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 400,
    })
  }
})

function getWelcomeEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AromaIQ</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9f7f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f7f4; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; max-width: 600px;">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #d4a574 0%, #c9996b 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">
                      🌿 AromaIQ
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #2c2c2c; font-size: 24px; font-weight: 600;">
                      Welcome, ${name}!
                    </h2>
                    
                    <p style="margin: 0 0 20px 0; color: #5a5a5a; font-size: 16px; line-height: 1.6;">
                      Thank you for joining the AromaIQ waitlist! We're thrilled to have you on this journey with us.
                    </p>
                    
                    <p style="margin: 0 0 20px 0; color: #5a5a5a; font-size: 16px; line-height: 1.6;">
                      AromaIQ is revolutionizing the way people experience aromatherapy by blending smart technology with natural wellness.
                    </p>
                    
                    <div style="background-color: #f9f7f4; border-left: 4px solid #d4a574; padding: 20px; margin: 30px 0; border-radius: 8px;">
                      <h3 style="margin: 0 0 10px 0; color: #2c2c2c; font-size: 18px; font-weight: 600;">
                        What's Next?
                      </h3>
                      <ul style="margin: 0; padding-left: 20px; color: #5a5a5a; font-size: 15px; line-height: 1.8;">
                        <li>You'll be among the first to know when we launch</li>
                        <li>Exclusive early-bird pricing for waitlist members</li>
                        <li>Behind-the-scenes updates on our development</li>
                        <li>Priority access to our beta program</li>
                      </ul>
                    </div>
                    
                    <p style="margin: 30px 0 0 0; color: #5a5a5a; font-size: 16px; line-height: 1.6;">
                      Stay fresh,<br>
                      <strong style="color: #d4a574;">The AromaIQ Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f7f4; padding: 30px; text-align: center; border-top: 1px solid #e8e6e3;">
                    <p style="margin: 0 0 15px 0; color: #8a8a8a; font-size: 14px;">
                      You're receiving this email because you joined the AromaIQ waitlist.
                    </p>
                    <p style="margin: 0; color: #8a8a8a; font-size: 12px;">
                      © 2025 AromaIQ. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
```

### Step 2: Set Resend API Key Secret

```bash
supabase secrets set RESEND_API_KEY=re_HLfNuDrK_LTSLT48NDH53SnqEZFvKHMyb
```

### Step 3: Deploy Edge Function

```bash
supabase functions deploy send-welcome-email
```

### Step 4: Update Frontend Code

In `/lib/resend.ts`, change:
```typescript
const MOCK_EMAIL_MODE = true; // Change to false
```

And update the `sendWelcomeEmail` function:
```typescript
export async function sendWelcomeEmail(to: string, name: string) {
  if (MOCK_EMAIL_MODE) {
    return await mockSendEmail(to, name);
  }
  
  // Call Supabase Edge Function instead of Resend directly
  try {
    const response = await fetch(
      'https://ljljpdacikvdcyeqvxrz.supabase.co/functions/v1/send-welcome-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_SUPABASE_ANON_KEY`, // Get from Supabase dashboard
        },
        body: JSON.stringify({ email: to, name }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    console.log('✅ Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
}
```

---

## Solution 2: Vercel/Netlify Serverless Function

**Best for:** Projects deployed on Vercel or Netlify  
**Difficulty:** Medium  
**Cost:** Free tier available  
**Time:** 15-20 minutes

### For Vercel

1. Create `/api/send-email.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AromaIQ <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to AromaIQ - You\'re on the Waitlist! 🌿',
        html: getEmailTemplate(name),
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
}

function getEmailTemplate(name: string) {
  // ... same template as above
}
```

2. Set environment variable in Vercel dashboard:
```
RESEND_API_KEY=re_HLfNuDrK_LTSLT48NDH53SnqEZFvKHMyb
```

3. Update frontend to call `/api/send-email`

### For Netlify

Similar process, but create `/netlify/functions/send-email.ts`

---

## Solution 3: Simple Backend Server

**Best for:** Custom infrastructure  
**Difficulty:** Medium-High  
**Cost:** Varies  
**Time:** 30-60 minutes

### Express.js Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { email, name } = req.body;
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'AromaIQ <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to AromaIQ!',
        html: getEmailTemplate(name),
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

---

## Quick Comparison

| Solution | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| Supabase Edge Function | ⭐⭐⭐ | Free tier | Already using Supabase |
| Vercel Serverless | ⭐⭐ | Free tier | Vercel deployments |
| Netlify Functions | ⭐⭐ | Free tier | Netlify deployments |
| Custom Backend | ⭐⭐⭐⭐ | Varies | Custom infrastructure |

---

## For Now: Keep Mock Mode

**Current setup is fine for development!**

✅ Waitlist works perfectly  
✅ Data is saved to Supabase  
✅ User experience is identical  
✅ You can see what emails would be sent (console logs)

When you're ready for production, implement one of the backend solutions above.

---

## Testing Mock Mode

Right now, when someone joins the waitlist:

1. ✅ Form submits successfully
2. ✅ Data saved to Supabase
3. ✅ Success animation shows
4. ✅ Console logs show email details:
   ```
   📧 [MOCK MODE] Email simulation successful
   📧 To: user@example.com
   📧 Name: John Doe
   ⚠️  No actual email was sent (browser limitation)
   💡 For production: Implement backend solution
   ```

This is perfect for:
- Development and testing
- Demos and prototypes
- Validating the flow
- Building the UI/UX

---

## FAQ

**Q: Will users know emails aren't being sent?**  
A: No, the user experience is identical. Only you see the console logs.

**Q: Is there any workaround to send from the browser?**  
A: No, CORS is a security feature. You need a backend.

**Q: Can I use a CORS proxy?**  
A: Not recommended - it exposes your API key and is insecure.

**Q: Which backend solution is easiest?**  
A: Supabase Edge Functions if you're already using Supabase.

**Q: What happens if I deploy with mock mode?**  
A: Everything works except actual emails won't be sent. Users won't know.

---

**Current Status:** 🟡 Mock Mode Active (Safe for Development)  
**Production Ready:** ❌ Needs Backend Implementation  
**Next Step:** Choose a backend solution from above when ready for production
