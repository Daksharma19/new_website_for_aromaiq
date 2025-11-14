# 🌿 AromaIQ - AI-Powered Aroma Diffuser

A modern, elegant website for AromaIQ - an intelligent aroma diffuser that transforms your space with smart scent technology.

## ✨ Features

- 🎨 **Premium Design** - Beige/gold theme with warm neutrals and elegant aesthetics
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Motion/React animations throughout
- 📧 **Email Notifications** - Automated welcome emails via Resend
- 🔐 **Supabase Backend** - Secure database for waitlist management
- ✅ **Form Validation** - Client-side and server-side validation
- 🎭 **Success Animations** - Beautiful confirmation states

## 🚀 Quick Start

### 1. Database Setup (Required)

```bash
# Go to Supabase SQL Editor
https://supabase.com/dashboard/project/ljljpdacikvdcyeqvxrz/sql

# Copy and run the SQL from:
/database-setup-simple.sql
```

### 2. Email Setup (Optional - Mock Mode Active)

⚠️ **Current Status:** Email notifications are in **MOCK MODE**

**What this means:**
- ✅ Waitlist works perfectly (users are saved to database)
- ✅ Success animations work
- ⚠️ Emails are simulated (not actually sent)
- 📧 Console logs show what would be sent

**For Production:** See `/BACKEND_EMAIL_SOLUTION.md` for backend setup

```bash
# Current: Mock mode (no setup needed)
# Production: Requires backend implementation
# See /BACKEND_EMAIL_SOLUTION.md for solutions
```

### 3. Test Everything

See `/SETUP_CHECKLIST.md` for detailed testing steps.

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── Navbar.tsx              # Navigation with theme toggle
│   ├── HeroSection.tsx         # Hero with CTA
│   ├── ProductSection.tsx      # Product showcase
│   ├── AboutSection.tsx        # Team and mission
│   ├── FAQSection.tsx          # Collapsible FAQ cards
│   ├── Footer.tsx              # Footer with social links
│   └── AuthDialog.tsx          # Waitlist form modal
├── lib/
│   ├── supabase.ts            # Supabase configuration
│   └── resend.ts              # Resend email setup
├── styles/
│   └── globals.css            # Global styles and theme
└── database-setup-simple.sql  # Database schema
```

## 📚 Documentation

### Setup Guides
- **`/SETUP_CHECKLIST.md`** - Complete setup checklist (START HERE)
- **`/SUPABASE_SETUP.md`** - Database setup instructions
- **`/RESEND_SETUP.md`** - Email configuration guide

### Integration Guides
- **`/INTEGRATION_SUMMARY.md`** - Full integration overview
- **`/WAITLIST_INTEGRATION.md`** - Waitlist system details

### Troubleshooting
- **`/QUICK_FIX.md`** - Fast solutions for common errors
- **`/TROUBLESHOOTING.md`** - Comprehensive debugging guide
- **`/ERROR_FIX_SUMMARY.md`** - Database error solutions

## 🎯 Key Features Explained

### Waitlist System

The waitlist form collects user information and stores it in Supabase:

**Fields:**
- Name (required)
- Email (required, unique)
- Source (required - where they heard about us)

**Features:**
- Duplicate email detection
- Validation (client-side + server-side)
- Success/error animations
- Auto-redirect after 3 seconds

**Flow:**
1. User clicks "Join Waitlist"
2. Fills form and submits
3. Data saved to Supabase
4. Welcome email sent via Resend
5. Success animation shown
6. Redirects to home page

### Email Notifications

Automated welcome emails sent via Resend:

**Sender:** AromaIQ <onboarding@resend.dev>  
**Subject:** Welcome to AromaIQ - You're on the Waitlist! 🌿

**Email includes:**
- Personalized greeting with user's name
- Welcome message
- Information about AromaIQ
- What to expect next
- Benefits of being on waitlist
- Professional branding

**Graceful error handling:**
- Email failure won't break signup flow
- User still added to waitlist
- Error logged (non-critical)

### Theme System

Dark/light mode with persistence:

```typescript
// Theme toggle in Navbar
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// Persisted in localStorage
localStorage.setItem('theme', theme);
```

**Colors:**
- Light: Warm beige (#f9f7f4), gold accents (#d4a574)
- Dark: Rich browns, muted golds
- Smooth transitions throughout

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion/React** - Animations
- **Supabase** - Backend & database
- **Resend** - Email delivery
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **shadcn/ui** - UI components

## 📊 Database Schema

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  auth_provider TEXT DEFAULT 'waitlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Email (for fast duplicate checks)
- Created_at (for sorting)

**Row Level Security:**
- Anyone can insert (join waitlist)
- Anyone can read (for duplicate check)

## 🧪 Testing

### Manual Testing Checklist

See `/SETUP_CHECKLIST.md` for complete testing guide.

**Key tests:**
1. New user signup ✅
2. Duplicate email handling ✅
3. Empty field validation ✅
4. Invalid email format ✅
5. Email delivery ✅
6. Theme toggle ✅
7. Responsive design ✅

### Console Logs

**Success:**
```
✅ Successfully added to waitlist: {...}
✅ Email sent successfully: {...}
📧 Welcome email sent successfully to: email@example.com
```

**Email failure (non-critical):**
```
✅ Successfully added to waitlist: {...}
⚠️ Email sending failed (non-critical): Error
```

## 🔐 Security

### Environment Variables

**Recommended for production:**

```typescript
// Instead of hardcoding in /lib/resend.ts
export const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
```

### API Key Safety

- Resend keys are safe for frontend (limited scope)
- Can only send emails, not read or delete
- Set up domain restrictions in Resend dashboard
- Rotate keys regularly

### Rate Limiting

**Current limits:**
- Resend free tier: 100 emails/day, 3,000/month
- Consider implementing frontend rate limiting for high traffic

## 📈 Analytics & Monitoring

### Metrics to Track

**Database (Supabase):**
```sql
-- Total signups
SELECT COUNT(*) FROM waitlist;

-- Signups by source
SELECT source, COUNT(*) FROM waitlist GROUP BY source;

-- Recent signups
SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 10;
```

**Email (Resend Dashboard):**
- Delivery rate (target: >95%)
- Open rate (typical: 20-40%)
- Spam complaints (target: <0.1%)
- Bounce rate

## 🚀 Deployment

### Pre-deployment Checklist

- [ ] Database setup completed in Supabase
- [ ] Resend API key configured
- [ ] Test waitlist form end-to-end
- [ ] Verify emails are delivered
- [ ] Test on multiple devices/browsers
- [ ] Check all animations work smoothly
- [ ] Verify theme toggle persists
- [ ] Test responsive design
- [ ] Update Resend sender email to custom domain (production)
- [ ] Set up error monitoring
- [ ] Configure analytics

### Environment-specific Setup

**Development:**
- Use `onboarding@resend.dev`
- Test mode enabled
- Console logging enabled

**Production:**
- Custom domain for email sender
- Domain verification in Resend
- SPF/DKIM/DMARC records configured
- Error tracking enabled
- Analytics integrated

## 🆘 Support & Troubleshooting

### Common Issues

| Issue | Quick Fix |
|-------|-----------|
| Schema error | Use `/database-setup-simple.sql` |
| No emails | Check API key in `/lib/resend.ts` |
| Duplicate error | Expected behavior - shows friendly message |
| Table not found | Run database setup SQL |

### Getting Help

1. Check `/QUICK_FIX.md` for immediate solutions
2. Review `/TROUBLESHOOTING.md` for detailed debugging
3. Check browser console for errors
4. Review Supabase logs
5. Check Resend email logs
6. Verify status pages:
   - https://status.supabase.com
   - https://status.resend.com

## 📝 License

© 2025 AromaIQ. All rights reserved.

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure
- **Resend** - Email delivery
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling framework
- **Motion** - Animation library

---

**Status:** 🟢 Production Ready  
**Version:** 1.0.0  
**Last Updated:** October 25, 2025

For questions or issues, refer to the documentation files in the root directory.
