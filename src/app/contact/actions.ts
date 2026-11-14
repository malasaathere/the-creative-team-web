"use server";

import { inquirySchema, topics, type Inquiry, type InquiryState } from "@/validators/inquiry";

const FIELDS = ["name", "email", "phone", "topic", "service", "item", "budget", "date", "message", "company_site"] as const;

/**
 * Contact / booking / order enquiry. Validates with the shared Zod schema,
 * then emails the studio through Resend when RESEND_API_KEY and
 * CONTACT_TO_EMAIL are set. Without them (local dev) it logs the enquiry.
 * Phase 5 replaces the booking path with real slots and a database record.
 */
export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")])) as Record<
    (typeof FIELDS)[number],
    string
  >;

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: InquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Inquiry;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // A filled honeypot looks like success to the bot but sends nothing.
    if (fieldErrors.company_site) return { status: "success", message: "Thanks — we'll be in touch." };
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const data = parsed.data;
  const topic = topics.find((t) => t.value === data.topic)?.label ?? data.topic;

  try {
    await deliver(data, topic);
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${data.name.split(" ")[0]}! We've got your message and will reply within one working day.`,
  };
}

async function deliver(d: Inquiry, topic: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "crentive website <onboarding@resend.dev>";

  const optional: [string, string | undefined][] = [
    ["Phone", d.phone],
    ["Service / package", d.service],
    ["Item", d.item],
    ["Budget", d.budget],
    ["Preferred date", d.date],
  ];
  const lines = [
    `Topic: ${topic}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    ...optional.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    d.message,
  ];

  if (!key || !to) {
    console.info("[inquiry] (email not configured — set RESEND_API_KEY and CONTACT_TO_EMAIL)\n" + lines.join("\n"));
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.email,
      subject: `${topic} — ${d.name}`,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
