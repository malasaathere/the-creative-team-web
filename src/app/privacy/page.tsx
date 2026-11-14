import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Privacy", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      sections={[
        { heading: "What we collect", body: "[The details people send through the contact and booking forms: name, email, phone and message.]" },
        { heading: "How we use it", body: "[Only to reply to enquiries, manage bookings and orders, and send the emails you ask for.]" },
        { heading: "Who we share it with", body: "[Service providers that run the site, such as hosting and email delivery. We never sell personal data.]" },
        { heading: "Your choices", body: "[How to ask for a copy of your data or have it deleted, and who to contact.]" },
      ]}
    />
  );
}
