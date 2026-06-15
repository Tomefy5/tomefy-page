import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, MotionWrapper, Float, Card, PageLayout } from "@/components/ui";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "AboutPage", path: "/about" });
}

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const expertise = t.raw("expertise.items") as {
    title: string;
    description: string;
  }[];

  return (
    <PageLayout>
      <Section>
        <Container>
          <div className="flex flex-col items-start gap-12 md:flex-row">
            <div className="flex-1">
              <MotionWrapper variant="scaleIn">
                <Heading variant="label">{t("title")}</Heading>
              </MotionWrapper>
              <MotionWrapper variant="scaleIn" delay={0.1} className="mt-6">
                <Heading variant="display">{t("hero.heading")}</Heading>
              </MotionWrapper>
              <MotionWrapper variant="scaleIn" delay={0.2} className="mt-8">
                <div className="space-y-4 text-body text-text-secondary">
                  {t("hero.body")
                    .split("\n\n")
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </MotionWrapper>
            </div>
            <MotionWrapper variant="fadeIn" delay={0.3}>
              <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border border-border-glass md:h-48 md:w-48">
                <Image
                  src="/images/tomefy-pdp.png"
                  alt="Tomefy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </Section>

      <Section decorated>
        <Container>
          <MotionWrapper variant="scaleIn">
            <Heading variant="label">{t("expertise.heading")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-12">
            <div className="grid gap-6 md:grid-cols-2">
              {expertise.map((item, i) => (
                <Float key={item.title} delay={i * 0.1} distance={5} duration={5}>
                  <Card as="div" className="group">
                    <h3 className="heading-card text-text-primary transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="caption mt-3 text-text-secondary">
                      {item.description}
                    </p>
                  </Card>
                </Float>
              ))}
            </div>
          </MotionWrapper>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <MotionWrapper variant="scaleIn">
            <Heading variant="label">{t("approach.heading")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-8">
            <div className="space-y-4 text-body text-text-secondary">
              {t("approach.body")
                .split("\n\n")
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </MotionWrapper>
        </Container>
      </Section>
    </PageLayout>
  );
}
