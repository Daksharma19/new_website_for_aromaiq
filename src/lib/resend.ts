// EmailJS Configuration for AromaIQ
// Documentation: https://www.emailjs.com/docs/

import emailjs from "@emailjs/browser";

/**
 * ✅ EmailJS - Frontend Email Solution
 *
 * EmailJS allows you to send emails directly from the frontend without a backend.
 * Perfect for waitlist confirmations, contact forms, and transactional emails.
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{to_email}} - recipient email
 *    - {{to_name}} - recipient name
 *    - {{from_name}} - your company name (AromaIQ)
 * 4. Get your credentials from EmailJS dashboard:
 *    - Public Key (User ID)
 *    - Service ID
 *    - Template ID
 * 5. Replace the placeholder values below with your actual credentials
 *
 * FREE TIER: 200 emails/month
 * More than enough for testing and early launches!
 */

// ⚠️ REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
// Follow the setup guide: /EMAILJS_SETUP_GUIDE.md or /EMAIL_QUICK_START.md
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE"; // Get from EmailJS dashboard → Account
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE"; // Get from EmailJS dashboard → Email Services
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE"; // Get from EmailJS dashboard → Email Templates

// Check if EmailJS is configured (checking against placeholder values)
export const isEmailConfigured =
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE" &&
  EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID_HERE" &&
  EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID_HERE" &&
  EMAILJS_PUBLIC_KEY.length > 0 &&
  EMAILJS_SERVICE_ID.length > 0 &&
  EMAILJS_TEMPLATE_ID.length > 0;

/**
 * Send a welcome email to a new waitlist user
 * @param to - Email address of the recipient
 * @param name - Name of the recipient
 * @returns Promise with the email sending result
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
) {
  if (!isEmailConfigured) {
    console.warn(
      "⚠️ EmailJS not configured - running in demo mode",
    );
    console.log(
      "📧 Setup Instructions: https://www.emailjs.com/",
    );
    console.log("📧 Would send email to:", to);
    console.log("📧 Recipient name:", name);
    return mockSendEmail(to, name);
  }

  try {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: to,
        to_name: name,
        from_name: "AromaIQ",
        subject:
          "Welcome to AromaIQ - You're on the Waitlist! 🌿",
        message: getWelcomeEmailText(name),
      },
    );

    console.log(
      "✅ Email sent successfully via EmailJS:",
      response,
    );
    return {
      status: response.status,
      text: response.text,
      to: to,
      name: name,
    };
  } catch (error: any) {
    console.error("❌ EmailJS error:", error);

    // Provide helpful error messages
    if (error.text) {
      console.error("Error details:", error.text);
    }

    // Don't throw - email failure shouldn't break signup
    console.log(
      "⚠️ Email failed but user was added to waitlist",
    );
    return {
      status: "error",
      error: error.text || error.message,
      to: to,
      name: name,
    };
  }
}

/**
 * Mock email sending for demo/unconfigured mode
 */
async function mockSendEmail(
  to: string,
  name: string,
): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log("📧 [DEMO MODE] Email would be sent to:", to);
  console.log("📧 Recipient:", name);
  console.log(
    "📧 Subject: Welcome to AromaIQ - You're on the Waitlist! 🌿",
  );
  console.log("");
  console.log("🔧 TO ENABLE REAL EMAILS:");
  console.log("1. Visit https://www.emailjs.com/ and sign up");
  console.log("2. Add an email service (Gmail recommended)");
  console.log(
    "3. Create a template with variables: to_email, to_name, from_name",
  );
  console.log("4. Update credentials in /lib/resend.ts");
  console.log("");

  return {
    status: "mock",
    to: to,
    name: name,
    message:
      "Demo mode - configure EmailJS to send real emails",
  };
}

/**
 * Plain text email message for EmailJS
 * @param name - Name of the recipient
 * @returns Plain text string for the email
 */
function getWelcomeEmailText(name: string): string {
  return `
Welcome to AromaIQ, ${name}!

Thank you for joining our waitlist! We're thrilled to have you on this journey with us.

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
  `.trim();
}