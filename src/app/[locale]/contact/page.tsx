import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { Container, Section, Heading, MotionWrapper, PageLayout } from "@/components/ui";
import { socialLinks, email } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: "ContactPage", path: "/contact" });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <PageLayout>
      <Section>
        <Container className="max-w-2xl text-center">
          <MotionWrapper variant="scaleIn">
            <Heading variant="display" as="h1">
              {t("heading")}
            </Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-8">
            <p className="text-body text-text-secondary">
              {t("body")}
            </p>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.2} className="mt-10">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${email}`}
                className="btn-text inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-bg-primary shadow-glass transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0"
              >
                {t("cta")}
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="https://cal.com/tomefy-w0iuga"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text inline-flex items-center gap-2 rounded-lg border border-border-glass bg-accent-glass px-8 py-3.5 text-accent shadow-glass transition-all duration-200 hover:border-accent/30 hover:bg-accent-subtle hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0"
              >
                {t("ctaCalendar")}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.3} className="mt-6">
            <p className="caption text-text-tertiary">{email}</p>
          </MotionWrapper>
        </Container>
      </Section>

      <Section decorated>
        <Container className="text-center">
          <MotionWrapper variant="scaleIn">
            <Heading variant="label">{t("social.heading")}</Heading>
          </MotionWrapper>
          <MotionWrapper variant="scaleIn" delay={0.1} className="mt-8">
            <div className="flex justify-center gap-8">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-text-secondary transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                >
                  {label}
                </a>
              ))}
            </div>
          </MotionWrapper>
        </Container>
      </Section>
    </PageLayout>
  );
}
