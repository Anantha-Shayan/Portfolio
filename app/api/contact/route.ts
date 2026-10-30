// app/api/contact/route.ts
// Contact form endpoint. A message counts as delivered only if at least one
// channel accepted it: email through Resend, and/or an optional chat webhook
// (Discord or Slack compatible) so a spam-filtered email never means a lost message.

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const LIMITS = { name: 100, email: 254, message: 5000 };
const MIN_FILL_MS = 2500; // a human takes longer than this to fill the form
const RATE = { max: 5, windowMs: 60 * 60 * 1000 };

// Best-effort rate limit. On serverless this is per warm instance, so it slows
// floods down rather than stopping them; it is not a substitute for a shared store.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) for (const [k, v] of hits) if (v.every((t) => now - t >= RATE.windowMs)) hits.delete(k);
  return recent.length > RATE.max;
}

const escapeHtml = (v: string) =>
  v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");

const fail = (status: number, error: string, fallback = false) => NextResponse.json({ error, fallback }, { status });

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "That request wasn't valid. Please try again.");
  }

  // Bots fill the hidden field or submit instantly. Pretend it worked and drop it.
  const filledFor = Date.now() - Number(body.startedAt ?? 0);
  if (body.website || !(filledFor > MIN_FILL_MS)) return NextResponse.json({ success: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) return fail(400, "Please fill in your name, email and message.");
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return fail(400, `Please keep the message under ${LIMITS.message} characters.`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, "Please enter a valid email address.");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return fail(429, "That's a few messages already. Please try again later, or email me directly.", true);

  // Local testing only: accept without sending anything.
  if (process.env.CONTACT_DRY_RUN === "1" && process.env.NODE_ENV !== "production") {
    console.log("[Contact Form] dry run", { name, email, length: message.length });
    return NextResponse.json({ success: true });
  }

  const subjectName = name.replace(/[\r\n]+/g, " ");
  const channels: Promise<void>[] = [];
  const configured: string[] = [];

  if (process.env.RESEND_API_KEY) {
    configured.push("email");
    channels.push(
      (async () => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL ?? "ananthashayan2802@outlook.com"],
          replyTo: email,
          subject: `Portfolio contact from ${subjectName}`,
          text: `From: ${name} <${email}>\n\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>New portfolio contact</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
            </div>`,
        });
        if (error) throw new Error(`Resend: ${JSON.stringify(error)}`);
      })(),
    );
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    configured.push("webhook");
    channels.push(
      (async () => {
        const text = `New portfolio message from ${name} <${email}>\n\n${message}`.slice(0, 1900);
        // "content" is Discord's field and "text" is Slack's; each ignores the other.
        const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text, text }),
        });
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      })(),
    );
  }

  if (!configured.length) {
    console.error("[Contact Form] No delivery channel configured (set RESEND_API_KEY and/or CONTACT_WEBHOOK_URL).");
    return fail(503, "The contact form isn't available right now.", true);
  }

  const results = await Promise.allSettled(channels);
  results.forEach((r, i) => r.status === "rejected" && console.error(`[Contact Form] ${configured[i]} failed:`, r.reason));
  if (results.every((r) => r.status === "rejected")) {
    return fail(502, "The message couldn't be delivered.", true);
  }
  return NextResponse.json({ success: true });
}
