import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormFromUrl } from "@/components/forms/ContactForm";
import { packageLabels, productLabels, serviceOptions } from "@/components/forms/formOptions";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { site } from "@/content/site";
import { toneWash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project, book a session or order from the shop.",
};

export default function ContactPage() {
  const formProps = { serviceOptions, packageLabels, productLabels };
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Let's build\nsomething"}
        dotColor="#FFFFFF"
        background={toneWash("social")}
        intro="Tell us what you're working on. We read every message and reply within one working day."
      />

      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <aside className="flex flex-col gap-10">
            <ContactBlock title="Email">
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </ContactBlock>
            <ContactBlock title="Phone & WhatsApp">
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {site.contact.phone}
              </a>
            </ContactBlock>
            <ContactBlock title="Studio">
              <span>{site.contact.location}</span>
              <span className="text-muted">{site.contact.hours}</span>
            </ContactBlock>
            <ContactBlock title="Follow">
              <span className="flex flex-wrap gap-x-5 gap-y-2">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} className="hover:text-white" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </span>
            </ContactBlock>
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

function ContactBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-white/10 pt-5 text-lg" data-reveal>
      <p className="mb-1 text-[13px] text-muted">{title}</p>
      {children}
    </div>
  );
}
