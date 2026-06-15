import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, PageLayout } from "@/components/ui";

type Props = { params: Promise<{ locale: string; slug: string }> };

const noteTitles: Record<string, { en: string; fr: string }> = {
  "why-agents-not-chatbots": {
    en: "Why I build agents, not chatbots",
    fr: "Pourquoi je construis des agents, pas des chatbots",
  },
  "hidden-cost-prompt-engineering": {
    en: "The hidden cost of prompt engineering",
    fr: "Le coût caché du prompt engineering",
  },
  "automation-first-vs-ai-first": {
    en: "Automation-first vs AI-first: a framework",
    fr: "Automatisation d'abord vs IA d'abord : un framework",
  },
  "building-observable-agent-systems": {
    en: "Building observable agent systems",
    fr: "Construire des systèmes d'agents observables",
  },
  "case-for-specialized-agents": {
    en: "The case for specialized agents",
    fr: "Le cas des agents spécialisés",
  },
};

export async function generateStaticParams() {
  const slugs = [
    "why-agents-not-chatbots",
    "hidden-cost-prompt-engineering",
    "automation-first-vs-ai-first",
    "building-observable-agent-systems",
    "case-for-specialized-agents",
  ];
  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "fr", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "NotesPage", path: "/notes" });
}

export default async function NotePage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "NotesPage" });
  const items = t.raw("items") as { title: string; date: string; excerpt: string }[];
  const note = items.find((item) => {
    const slugified = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return slugified === slug;
  });

  if (!note) {
    const knownTitle = noteTitles[slug];
    if (!knownTitle) notFound();

    return (
      <main className="flex flex-1 flex-col">
        <Section>
          <Container className="max-w-3xl">
            <Heading variant="display" as="h1">
              {knownTitle[locale as "en" | "fr"] || knownTitle.en}
            </Heading>
            <p className="mt-8 text-body text-text-secondary">
              This note is coming soon. Check back later.
            </p>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <PageLayout>
      <Section>
        <Container className="max-w-3xl">
          <Heading variant="display" as="h1">
            {note.title}
          </Heading>
          <p className="mt-8 text-body text-text-secondary">
            {note.excerpt}
          </p>
          <p className="meta mt-8 text-text-tertiary">
            Full article coming soon.
          </p>
        </Container>
      </Section>
    </PageLayout>
  );
}
