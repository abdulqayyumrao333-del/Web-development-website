import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Simple HTML Email Template ──
function getWelcomeEmailHTML(email: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Abdul Qayyum's Newsletter</title>
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
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
          .list {
            color: #475569;
            line-height: 2;
            padding-left: 20px;
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
          .link {
            color: #4F46E5;
            text-decoration: none;
          }
          .link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🚀</div>
            <h1 class="title">Welcome to the Newsletter!</h1>
          </div>

          <p class="text">Hey there! 👋</p>

          <p class="text">
            Thanks for subscribing to <strong>Abdul Qayyum's</strong> newsletter.
            You're now part of a growing community of developers, builders, and
            tech enthusiasts.
          </p>

          <p class="text">Here's what you can expect:</p>

          <ul class="list">
            <li>✅ New blog posts about full-stack development</li>
            <li>✅ AI and automation insights</li>
            <li>✅ Project updates and launches</li>
            <li>✅ Technical tips and best practices</li>
          </ul>

          <p class="text">
            I'll be sharing valuable content that helps you build better software.
            Stay tuned! 🎉
          </p>

          <hr class="divider" />

          <p class="footer">
            You're receiving this email because you subscribed to Abdul Qayyum's newsletter.
            <br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe?email=${email}" class="link">
              Unsubscribe anytime
            </a>
          </p>
        </div>
      </body>
    </html>
  `;
}

// ── Send Welcome Email ──
export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `Abdul Qayyum <${process.env.EMAIL_FROM || "onboarding@resend.dev"}>`,
      to: email,
      subject: "Welcome to Abdul Qayyum's Newsletter! 🚀",
      html: getWelcomeEmailHTML(email),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send welcome email" };
  }
}