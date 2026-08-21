import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // ── Validation ──
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Check if already subscribed ──
    try {
      const existing = await db.subscriber.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "You're already subscribed!" },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Continue even if DB fails
    }

    // ── Save to database ──
    try {
      await db.subscriber.create({
        data: {
          email: email.toLowerCase(),
        },
      });
    } catch (dbError) {
      console.error("Failed to save subscriber:", dbError);
      // Continue even if DB fails
    }

    // ── Send Welcome Email ──
    const emailResult = await sendWelcomeEmail(email);

    if (!emailResult.success) {
      console.error("Welcome email failed:", emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully! Check your email for confirmation.",
      emailSent: emailResult.success,
    });

  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}