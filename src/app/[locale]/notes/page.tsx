import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, MotionWrapper, Float, Card, PageLayout } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "NotesPage", path: "/notes" });
}

export default function NotesPage() {
  const t = useTranslations("NotesPage");
  const items = t.raw("items") as {
    title: string;
    date: string;
    excerpt: string;
  }[];

  return (
    <PageLayout>
      <Section>
        <Container>
          <MotionWrapper variant="scaleIn">
            <Heading variant="display">{t("title")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-6 max-w-2xl">
            <p className="text-body text-text-secondary">
              {t("description")}
            </p>
          </MotionWrapper>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-6">
            {items.map((item, i) => (
              <Float key={item.title} delay={i * 0.08} distance={4} duration={5}>
                <Card as="article" className="group">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="heading-card text-text-primary transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <span className="meta shrink-0 tabular-nums text-text-tertiary">
                      {item.date}
                    </span>
                  </div>
                  <p className="caption mt-3 text-text-secondary">
                    {item.excerpt}
                  </p>
                </Card>
              </Float>
            ))}
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
