"use server";

import { Resend } from "resend";
import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = formData.get("subject") as string || "New Contact Form Submission";
    const company = formData.get("company") as string || "";
    const country = formData.get("country") as string || "";
    const projectType = formData.get("projectType") as string || "";
    const budgetRange = formData.get("budgetRange") as string || "";
    const timeline = formData.get("timeline") as string || "";
    const contactReason = formData.get("contactReason") as string || "";
    const preferredContactMethod = formData.get("preferredContactMethod") as string || "";

    // ── 1. Save to Database ──
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        company,
        country,
        subject,
        message,
        projectType,
        budgetRange,
        timeline,
        contactReason,
        preferredContactMethod,
        status: "NEW",
      },
    });

    // ── 2. Send Auto-Reply Email to User ──
    await sendAutoReplyEmail(name, email, message);

    // ── 3. Send Notification Email to Admin ──
    await sendAdminNotification(name, email, message, subject);

    return { 
      success: true, 
      message: "Message sent successfully! We'll get back to you soon." 
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return { 
      success: false, 
      message: "Failed to send message. Please try again." 
    };
  }
}

// ── Auto-Reply Email to User ──
async function sendAutoReplyEmail(name: string, email: string, message: string) {
  try {
    const autoReplyHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Thank You for Reaching Out</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #f8fafc;
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              padding: 48px 40px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 24px;
            }
            .emoji {
              font-size: 48px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #0f172a;
              margin-top: 12px;
            }
            .text {
              color: #475569;
              line-height: 1.7;
              margin: 16px 0;
            }
            .divider {
              border: none;
              border-top: 1px solid #e2e8f0;
              margin: 24px 0;
            }
            .footer {
              font-size: 12px;
              color: #94a3b8;
              text-align: center;
            }
            .highlight {
              color: #4F46E5;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="emoji">🙏</div>
              <h1 class="title">Thank You for Reaching Out!</h1>
            </div>

            <p class="text">Hi <strong>${name}</strong>,</p>

            <p class="text">
              Thanks for contacting me. I've received your message and will review it shortly.
            </p>

            <p class="text">
              Here's a quick summary of what you shared:
            </p>

            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 4px 0; font-size: 14px; color: #475569;">
                <strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
              </p>
            </div>

            <p class="text">
              I typically respond within <strong>24 hours</strong>. If this is urgent, feel free to reach out via WhatsApp.
            </p>

            <p class="text" style="margin-top: 24px;">
              Looking forward to connecting with you!<br />
              <span class="highlight">Abdul Qayyum</span>
            </p>

            <hr class="divider" />

            <p class="footer">
              You're receiving this email because you contacted Abdul Qayyum.
              <br />
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${email}" style="color: #4F46E5; text-decoration: none;">
                Unsubscribe from future emails
              </a>
            </p>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: `Abdul Qayyum <${process.env.EMAIL_FROM || "onboarding@resend.dev"}>`,
      to: email,
      subject: "Thanks for Reaching Out! 🙏",
      html: autoReplyHTML,
    });

    console.log("Auto-reply email sent to:", email);
  } catch (error) {
    console.error("Auto-reply email error:", error);
    // Don't throw - user should still see success even if email fails
  }
}

// ── Admin Notification Email ──
async function sendAdminNotification(name: string, email: string, message: string, subject: string) {
  try {
    const adminHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f8fafc; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; }
            .title { color: #0f172a; font-size: 24px; margin-bottom: 16px; }
            .field { margin: 12px 0; }
            .label { font-weight: 600; color: #475569; }
            .value { color: #0f172a; }
            .divider { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
            .badge { display: inline-block; background: #fef08a; color: #854d0e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">📩 New Contact Form Submission</h1>
            <span class="badge">NEW</span>
            
            <hr class="divider" />
            
            <div class="field"><span class="label">Name:</span> <span class="value">${name}</span></div>
            <div class="field"><span class="label">Email:</span> <span class="value">${email}</span></div>
            <div class="field"><span class="label">Subject:</span> <span class="value">${subject}</span></div>
            <div class="field"><span class="label">Message:</span></div>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 8px 0 16px 0;">
              ${message}
            </div>
            
            <hr class="divider" />
            
            <div style="text-align: center; color: #94a3b8; font-size: 12px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/messages" style="color: #4F46E5; text-decoration: none;">
                View in Admin Dashboard →
              </a>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: `Contact Form <${process.env.EMAIL_FROM || "onboarding@resend.dev"}>`,
      to: process.env.CONTACT_TO_EMAIL || "abdulqayyumrao333@gmail.com",
      subject: `📩 New Contact: ${subject}`,
      html: adminHTML,
    });

    console.log("Admin notification sent to:", process.env.CONTACT_TO_EMAIL);
  } catch (error) {
    console.error("Admin notification error:", error);
  }
}