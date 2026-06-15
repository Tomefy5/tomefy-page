"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default function LabSection() {
  const t = useTranslations("HomePage.lab");
  const locale = useLocale();

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
