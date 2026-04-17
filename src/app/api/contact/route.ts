import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project: z.string().min(10),
  budget: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: "Mail service not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <noreply@akashcodecafe.tech>",
        to: ["akash@akashcodecafe.tech"],
        reply_to: data.email,
        subject: `New inquiry from ${data.name}`,
        html: `
          <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:24px;background:#09090b;color:#fafafa;border-radius:12px">
            <h2 style="color:#22d3ee;margin-top:0">New Portfolio Contact</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#22d3ee">${data.email}</a></p>
            <p><strong>Budget:</strong> ${data.budget ?? "Not specified"}</p>
            <hr style="border-color:#27272a;margin:16px 0"/>
            <p><strong>Project:</strong></p>
            <p style="color:#a1a1aa;white-space:pre-wrap">${data.project}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
