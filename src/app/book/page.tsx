import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm, ContactFormFromUrl } from "@/components/forms/ContactForm";
import { packageLabels, productLabels, serviceOptions } from "@/components/forms/formOptions";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { toneWash, vars } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a session",
  description: "Request a shoot, a film day or a project kick-off call with the crentive team.",
};

// Online booking with live time slots arrives in phase 5 of the build.
// Until then this page takes a booking request through the enquiry form.
const steps = [
  { title: "Send a request", body: "Pick a service or package and a date that suits you." },
  { title: "We confirm", body: "We check the calendar and reply with a time and a reference." },
  { title: "Lock it in", body: "Pay the deposit by bank transfer and the slot is yours." },
];

export default function BookPage() {
  const formProps = { serviceOptions, packageLabels, productLabels, defaultTopic: "booking", showDate: true };
  return (
    <>
      <PageHero
        eyebrow="Book a session"
        title={"Let's find\na time"}
        background={toneWash("design")}
        intro="Tell us what you'd like to book and when. We'll confirm a slot within one working day."
      />

      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <aside>
            <ol className="flex flex-col gap-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-t border-white/10 pt-5" data-reveal style={vars({ "--i": i })}>
                  <span className="font-display text-3xl font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="mb-1 block text-lg font-semibold">{s.title}</span>
                    <span className="text-[15px] leading-normal text-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-10 rounded-2xl border border-white/10 bg-surface p-5 text-sm leading-relaxed text-muted">
              Online booking with live time slots is coming soon. Not ready to book?{" "}
              <Link href="/packages" className="text-text underline underline-offset-4 hover:text-white">
                Compare packages
              </Link>
              .
            </p>
          </aside>
          <div>
            <Suspense fallback={<ContactForm {...formProps} />}>
              <ContactFormFromUrl {...formProps} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
