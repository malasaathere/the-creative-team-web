import { z } from "zod";

export const topics = [
  { value: "project", label: "A new project" },
  { value: "booking", label: "Book a session" },
  { value: "order", label: "Order from the shop" },
  { value: "other", label: "Something else" },
] as const;

export const budgets = ["Not sure yet", "Under LKR 50,000", "LKR 50,000 – 150,000", "LKR 150,000 – 500,000", "LKR 500,000+"] as const;

/** One schema shared by the form (field names, limits) and the server action. */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Use digits, spaces and + only.")
    .optional()
    .or(z.literal("")),
  topic: z.enum(topics.map((t) => t.value) as [string, ...string[]]),
  service: z.string().trim().max(60).optional().or(z.literal("")),
  item: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  date: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A little more detail helps — at least 10 characters.").max(4000),
  // Honeypot: real people never fill this in.
  company_site: z.string().max(0).optional().or(z.literal("")),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof Inquiry, string>>;
  values?: Partial<Record<keyof Inquiry, string>>;
};
