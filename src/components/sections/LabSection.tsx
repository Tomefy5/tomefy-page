import { getTranslations, getLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function LabSection() {
  const t = await getTranslations("HomePage.lab");
  const locale = await getLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="label-eyebrow text-accent">
            {t("heading")}
          </h2>
          <p className="text-body-lg mt-6 text-text-secondary md:text-xl md:leading-relaxed">
            {t("body")}
          </p>
          <LinkButton
            href={`/${locale}/lab`}
            variant="ghost"
            className="mt-8"
          >
            {t("cta")}
            <span aria-hidden="true">&rarr;</span>
          </LinkButton>
        </MotionWrapper>
      </div>
    </section>
  );
}
