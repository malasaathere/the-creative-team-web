import type { Metadata } from "next";
import { Suspense } from "react";
import { BookCTA } from "@/components/sections/Blocks";
import { WorkGrid, WorkGridView } from "@/components/sections/WorkGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { toneWash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects in brand identity, photography, film, web and social media.",
};

export default function WorkPage() {
  const filters = services.map((s) => ({ slug: s.slug, label: s.shortName }));
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={"Bringing brands\nto life"}
        background={toneWash("video")}
        intro="A selection of identities, shoots, films, websites and campaigns made by the crentive team."
      />
      <Container className="py-24">
        {/* The filter reads the URL, so it renders after the static grid. */}
        <Suspense fallback={<WorkGridView projects={projects} filters={filters} />}>
          <WorkGrid projects={projects} filters={filters} />
        </Suspense>
      </Container>
      <BookCTA title="Your project next" eyebrow="Have something in mind?" />
    </>
  );
}
