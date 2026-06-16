import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, Badge, MotionWrapper, Float, Card, PageLayout } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "WorkPage", path: "/work" });
}

export default async function WorkPage() {
  const t = await getTranslations("WorkPage");
  const items = t.raw("items") as {
    title: string;
    description: string;
    tags: string[];
    year: string;
    github?: string;
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

      <Section decorated>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item, i) => (
              <Float key={item.title} delay={i * 0.1} distance={5} duration={5}>
                <Card as="article" className="group">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="heading-card min-w-0 text-text-primary transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <span className="meta shrink-0 tabular-nums text-text-tertiary">
                      {item.year}
                    </span>
                  </div>
                  <p className="caption mt-3 text-text-secondary">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta ml-auto text-text-tertiary transition-colors hover:text-accent"
                      >
                        GitHub &rarr;
                      </a>
                    )}
                  </div>
                </Card>
              </Float>
            ))}
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
