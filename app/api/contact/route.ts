// app/api/contact/route.ts
// Server-side API route for the contact form.
//
// Currently just validates the payload and returns 200.
// To wire up real email delivery, uncomment the Resend block below
// and add RESEND_API_KEY to your .env.local.

import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name:    string;
  email:   string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    const { name, email, message } = body;

    // ── Basic validation ────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // ── Option A: Resend (uncomment to enable) ───────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from:    "Portfolio <no-reply@ananthashayan.dev>",
    //   to:      ["ananthashayan2802@outlook.com"],
    //   subject: `Portfolio contact from ${name}`,
    //   text:    `From: ${name} <${email}>\n\n${message}`,
    // });

    // ── Option B: log to console (development default) ───────
    console.log("[Contact Form]", { name, email, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
