import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, Badge, MotionWrapper, Float, Card, PageLayout } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: "EntrepreneurshipPage",
    path: "/entrepreneurship",
  });
}

export default function EntrepreneurshipPage() {
  const t = useTranslations("EntrepreneurshipPage");
  const items = t.raw("items") as {
    title: string;
    description: string;
    tags: string[];
    year: string;
  }[];

  return (
    <PageLayout>
      <Section>
        <Container>
          <MotionWrapper variant="scaleIn">
            <Heading variant="label">{t("title")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-6 max-w-3xl">
            <Heading variant="display">{t("hero.heading")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.2} className="mt-8 max-w-2xl">
            <p className="text-body text-text-secondary">
              {t("hero.body")}
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
                    <h3 className="heading-card text-text-primary transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <span className="meta shrink-0 tabular-nums text-text-tertiary">
                      {item.year}
                    </span>
                  </div>
                  <p className="caption mt-3 text-text-secondary">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </Float>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <MotionWrapper variant="scaleIn">
            <Heading variant="label">{t("philosophy.heading")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-8">
            <p className="text-body-lg text-text-secondary md:text-xl md:leading-relaxed">
              {t("philosophy.body")}
            </p>
          </MotionWrapper>
        </Container>
      </Section>
    </PageLayout>
  );
}
