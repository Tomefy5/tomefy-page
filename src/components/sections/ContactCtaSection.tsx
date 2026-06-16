import { getTranslations, getLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function ContactCtaSection() {
  const t = await getTranslations("HomePage.contact");
  const locale = await getLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="heading-section">
            {t("heading")}
          </h2>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.15}>
          <div className="mt-10">
            <LinkButton href={`/${locale}/contact`} className="px-8 py-3.5">
              {t("cta")}
              <span aria-hidden="true">&rarr;</span>
            </LinkButton>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
