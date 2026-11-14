import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Terms", robots: { index: false } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      sections={[
        { heading: "Bookings", body: "[Deposits, rescheduling up to 24 hours before a session, and cancellations.]" },
        { heading: "Projects", body: "[Quotes, rounds of changes, timelines and when ownership of the work passes to the client.]" },
        { heading: "Shop orders", body: "[Payment by bank transfer, cash on delivery or on pickup; delivery times; returns; digital downloads.]" },
        { heading: "Contact", body: "[How to reach the studio about these terms.]" },
      ]}
    />
  );
}
