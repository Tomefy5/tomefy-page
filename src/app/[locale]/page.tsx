import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageLayout } from "@/components/ui";
import {
  HeroSection,
  FounderSection,
  ProofSection,
  FeaturedWorkSection,
  LabSection,
  NotesPreviewSection,
  ContactCtaSection,
} from "@/components/sections";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "HomePage", path: "" });
}

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <FounderSection />
      <ProofSection />
      <FeaturedWorkSection />
      <LabSection />
      <NotesPreviewSection />
      <ContactCtaSection />
    </PageLayout>
  );
}
